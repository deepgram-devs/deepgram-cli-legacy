import { Command } from "@oclif/core";
import { Deepgram } from "@deepgram/sdk";
import { open } from "fs/promises";
import chalk from "chalk";
import inquirer from "inquirer";

import { validateApiKey } from "../../validator/apiKey";
import { validateProjectID } from "../../validator/projectId";

const homedir = require("os").homedir();

export default class Setup extends Command {
  static prompts = [
    {
      type: "password",
      name: "api_key",
      message: "Please enter a Deepgram API Key:",
      validate: validateApiKey,
    },
  ];

  static args = [
    {
      name: "api_key",
      env: "deepgram_api_key",
      required: false,
      description: "Deepgram API Key.",
    },
    {
      name: "project",
      required: false,
      description: "Deepgram Project",
    },
  ];

  static description =
    "Writes the API key and Deepgram Project to a config file (can be overridden).";

  static examples = [
    `$ bin/dev setup
? Please enter a Deepgram API Key: [hidden]
? Please select a Project: luke@lukeoliff.com's Project
Config file created at ~/.deepgramrc`,
    `$ bin/dev setup 
? Please enter a Deepgram API Key: [hidden]
? Please select a Project: luke@lukeoliff.com's Project
Existing config file  ~/.deepgramrc detected.
? Overwrite it existing config file? Yes
Overwriting the existing config file  ~/.deepgramrc
Config file created at  ~/.deepgramrc`,
    `$ bin/dev setup b79a9edd77d3938760cfa17c7a049fbfeeea775b
? Please select a Project: luke@lukeoliff.com's Project
Config file created at ~/.deepgramrc`,
    `$ bin/dev setup b79a9edd77d3938760cfa17c7a049fbfeeea775b b0605341-7d79-bbc7-4a4a-c3f9165852f0
Config file created at ~/.deepgramrc`,
  ];

  public async run(): Promise<void> {
    let { args } = await this.parse(Setup);
    args = await inquirer.prompt(Setup.prompts, args);

    if (args.api_key && !args.project) {
      const dg = new Deepgram(args.api_key);
      const { projects } = await dg.projects
        .list()
        .catch((err) => this.error(err));

      const choices = projects.map((project) => ({
        name: project.name,
        short: project.name,
        value: project.project_id,
      }));

      args = await inquirer.prompt(
        [
          {
            type: "list",
            name: "project",
            message: "Please select a Deepgram Project:",
            validate: validateProjectID,
            choices,
          },
        ],
        args
      );
    }

    const filePath = `${homedir}/.deepgramrc`;

    let file = await open(filePath, "wx").catch((err) => {
      if (err.code === "EEXIST") {
        this.log(
          `${chalk.red(">>")} Existing config file ${filePath} detected.`
        );
        return;
      }

      throw err;
    });

    if (!file) {
      const overwritePrompt = await inquirer.prompt([
        {
          type: "confirm",
          name: "overwrite",
          message: `Overwrite it existing config file?`,
          default: false,
        },
      ]);

      if (!overwritePrompt.overwrite) {
        this.error(
          `Config file ${chalk.cyan(
            filePath
          )} already existed. Use cancelled overwrite.`
        );
      }

      this.log(`Overwriting the existing config file ${chalk.cyan(filePath)}`);
      file = await open(filePath, "w").catch((err) => this.error(err));
    }

    this.log(`Config file created at ${chalk.cyan(filePath)}`);
    const data = Buffer.from(JSON.stringify(args));
    await file.write(data).catch((err) => this.error(err));
  }
}
