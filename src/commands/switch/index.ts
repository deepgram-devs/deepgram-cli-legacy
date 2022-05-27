import { open, readFile } from "fs/promises";
import chalk from "chalk";
import inquirer from "inquirer";

import { validateProjectID } from "../../validator/projectId";
import SecureCommand from "../../secure";

const homedir = require("os").homedir();

export default class ListProjects extends SecureCommand {
  static args = [
    {
      name: "project",
      required: false,
      description: "Deepgram Project",
    },
  ];

  static description = "Switch Deepgram project and update the config file.";

  async run(): Promise<void> {
    const { projects } = await this.deepgram.projects
      .list()
      .catch((err) => this.error(err));

    const choices = projects.map((project) => ({
      name: project.name,
      short: project.name,
      value: project.project_id,
    }));

    const { project } = await inquirer.prompt([
      {
        type: "list",
        name: "project",
        message: "Please select a Deepgram Project:",
        validate: validateProjectID,
        choices,
      },
    ]);

    const { config: filePath } = this.appConfig;
    const existingFile = await readFile(filePath, "utf-8");
    const config = JSON.parse(existingFile);

    // update existing config project ID to new project ID
    config.project = project;

    this.log(
      `Updating the existing Deepgram Project in ${chalk.cyan(filePath)}`
    );
    const file = await open(filePath, "w").catch((err) => this.error(err));

    this.log(`Config file updated at ${chalk.cyan(filePath)}`);
    const data = Buffer.from(JSON.stringify(config));
    await file.write(data).catch((err) => this.error(err));
  }
}
