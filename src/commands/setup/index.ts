import { Flags } from "@oclif/core";
import { BaseCommand } from "../../base";
import { createClient } from "@deepgram/sdk";
import { select, confirm } from "@inquirer/prompts";
import { homedir } from "os";
import { open } from "fs/promises";

export default class Setup extends BaseCommand<typeof Setup> {
  static description =
    "Setup the CLI using your Deepgram API key. This will create a new limited key for you on your account.";

  static flags = {
    key: Flags.string({
      char: "k",
      description: "An API key provided by Deepgram.",
      summary: "https://dpgr.am/api-key",
      required: false,
      inquirer: "password",
    }),
    scopes: Flags.string({
      char: "s",
      description: "Comma separated string of Deepgram API scopes.",
      default: "member",
      summary: "https://dpgr.am/scopes",
      required: false,
    }),
    ttl: Flags.integer({
      char: "t",
      description:
        "How many seconds you should remain logged in with the Deepgram CLI. Default: 86400",
      default: 86400,
      summary: "https://dpgr.am/ttl",
      required: false,
    }),
  };

  public async run(): Promise<void> {
    const { flags } = await this.parse(Setup);
    let { key: auth, scopes, ttl } = flags;

    if (!auth) {
      this.error(new Error("key required"));
    }

    const deepgramClient = createClient(auth, {
      global: { url: "api.deepgram.com" },
    });

    let { result: projectsResult, error: projectsError } =
      await deepgramClient.manage.getProjects();

    if (projectsError) {
      this.error(projectsError.message);
    }

    const project = projectsResult?.projects[0];

    if (!project) {
      this.error("Cannot find a Deepgram project. Please create a project first.");
    }

    if (!scopes) {
      scopes = "member";
    }

    const scopesArray = scopes.split(",");

    let { result: newKeyResult, error: newKeyError } = await deepgramClient.manage.createProjectKey(
      project.project_id,
      {
        comment: "Deepgram CLI API key",
        scopes: scopesArray,
        tags: ["cli"],
        time_to_live_in_seconds: ttl,
      }
    );

    if (newKeyError) {
      this.error(newKeyError.message);
    }

    const key = newKeyResult?.api_key_id;

    if (!key) {
      this.error("Could not create an API key.");
    }

    console.log(key);

    const filePath = `${homedir()}/.deepgramrc`;
    let file;

    /**
     * Open a file handler if one doesn't exist.
     */
    file = await open(filePath, "wx").catch((err) => {
      if (err.code === "EEXIST") {
        this.log(`Existing config file '${filePath}' detected.`);
        return; // Return without killing the process.
      }

      this.error(err);
    });

    /**
     * If one does exist, prompt the user to overwrite it.
     */
    if (!file) {
      const overwritePrompt = await confirm({
        message: `Overwrite it existing config file?`,
      });

      if (!overwritePrompt) {
        this.error(`Config file '${filePath}' already existed. Use cancelled overwrite.`);
      }

      this.log(`Overwriting the existing config file '${filePath}'`);
      file = await open(filePath, "w").catch((err) => this.error(err));
    }

    const now = Math.floor(Date.now() / 1000);
    const configBody = {
      key,
      project: project.project_id,
      scopes,
      expires: now + ttl,
    };

    const data = Buffer.from(JSON.stringify(configBody));
    await file.write(data).catch((err) => this.error(err));
    this.log(`Config file created at '${filePath}'`);
  }
}
