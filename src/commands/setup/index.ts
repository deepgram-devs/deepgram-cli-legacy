import { Flags } from "@oclif/core";
import { BaseCommand } from "../../base";
import { Deepgram } from "@deepgram/sdk";
import { select, confirm } from "@inquirer/prompts";
import { homedir } from "os";
import { open } from "fs/promises";

export default class Setup extends BaseCommand<typeof Setup> {
  static description =
    "Setup the CLI using a Deepgram API Key. Read more: https://dpgr.am/cli";

  static flags = {
    key: Flags.string({
      char: "k",
      env: "DEEPGRAM_API_KEY",
      description:
        "An API key provided by Deepgram. Get one now: https://dpgr.am/cli",
      summary: "Deepgram API Key",
      required: false,
      prompt: true,
    }),
    project: Flags.string({
      char: "p",
      env: "DEEPGRAM_PROJECT_ID",
      description: "A Deepgram Project ID, found on your dashboard.",
      summary: "Deepgram Project ID",
      required: false,
    }),
  };

  public async run(): Promise<void> {
    const dg = new Deepgram(this.parsedFlags.key);

    /**
     * prompt for a project if one wasn't supplied
     */
    if (!("project" in this.parsedFlags)) {
      const { projects } = await dg.projects
        .list()
        .catch((err) => this.error(err));

      this.parsedFlags["project"] = await select({
        message: "Please enter a Deepgram Project ID:",
        choices: projects.map((project) => ({
          name: project.name || project.project_id,
          value: project.project_id,
          description: `Deepgram Project ID ${project.project_id}`,
        })),
      });
    }

    /**
     * validate the project used is available to this key
     */
    await dg.projects
      .get(this.parsedFlags.project)
      .catch((err) => this.error(err));

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

    const data = Buffer.from(JSON.stringify(this.parsedFlags));
    await file.write(data).catch((err) => this.error(err));
    this.log(`Config file created at '${filePath}'`);
  }
}
