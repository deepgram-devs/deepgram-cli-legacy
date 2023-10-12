import { Flags } from "@oclif/core";
import { BaseCommand } from "../../base";
import { createClient } from "@deepgram/sdk";
import { select, confirm } from "@inquirer/prompts";
import { homedir } from "os";
import { open } from "fs/promises";

export default class Setup extends BaseCommand<typeof Setup> {
  static description = "Setup the CLI using a Deepgram API key.";

  static flags = {
    key: Flags.string({
      char: "k",
      env: "DEEPGRAM_API_KEY",
      description: "An API key provided by Deepgram.",
      summary: "https://dpgr.am/api-key",
      required: false,
      prompt: true,
      inquirer: "password",
    }),
    scopes: Flags.string({
      char: "s",
      env: "DEEPGRAM_API_SCOPES",
      description: "Comma separated string of Deepgram API scopes.",
      default: "member",
      summary: "https://dpgr.am/scopes",
      required: false,
    }),
    ttl: Flags.integer({
      char: "t",
      env: "DEEPGRAM_API_TTL",
      description:
        "How many seconds you should remain logged in with the Deepgram CLI. Default: 86400",
      default: 86400,
      summary: "https://dpgr.am/ttl",
      required: false,
    }),
  };

  public async run(): Promise<void> {
    let { key: auth, scopes, ttl } = this.parsedFlags;
    const dg = createClient(auth, {
      global: { url: "api.beta.deepgram.com" },
    });

    const {
      projects: [project],
    } = await dg.projects.list().catch((err) => this.error(err));

    if (!scopes) {
      scopes = ["member"];
    }

    if (typeof scopes === "string") {
      scopes = this.parsedFlags["scopes"].split(",");
    }

    const { key } = await dg.keys.create(
      project.project_id,
      "Deepgram CLI",
      scopes,
      {
        timeToLive: ttl,
        tags: ["cli"],
      }
    );

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
        this.error(
          `Config file '${filePath}' already existed. Use cancelled overwrite.`
        );
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
