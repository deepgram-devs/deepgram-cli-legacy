import { EOL } from "os";
import { open } from "fs/promises";
import { PathLike } from "fs";

import SecureCommand from "../../secure";
import inquirer from "inquirer";
import path from "path";
import toml from "toml";
import chalk from "chalk";
import { validateTemplateName } from "../../validator/templateName";

const download = require("git-a-repo");
const { spawn } = require("child_process");
const INDENT = "  ";

export default class Generate extends SecureCommand {
  static prompts = [
    {
      type: "input",
      name: "template",
      message: "Enter a template name or a template repo URL:",
      validate: validateTemplateName,
    },
  ];

  static args = [
    {
      name: "template",
      required: false,
      description: "Template name or repo URL",
    },
  ];

  static description =
    "Generate a new project from our Deepgram templates directory. See https://github.com/deepgram-templates";

  public async run(): Promise<void> {
    let { args } = await this.parse(Generate);
    args = await inquirer.prompt(Generate.prompts, args);

    // extract the folder name from the repo or url provided
    const name = args.template
      .replace(/\/$/, "")
      .split("/")
      .pop()
      .split(".")
      .shift();

    this.log(`Cloning '${args.template}' to './${name}'`);
    download(args.template, name, async (err: any) => {
      if (err) {
        this.log(`Error occured trying to clone '${args.template}'.`);
        this.error(err);
      } else {
        const buildDir: PathLike = path.resolve(`./${name}`);
        const tomlPath: PathLike = `${buildDir}/deepgram.toml`;

        const file = await open(tomlPath, "r").catch((err) => this.error(err));

        if (!file) {
          this.error(
            `The template project '${args.template}' has no 'deepgram.toml'`
          );
        }

        const {
          build,
          config,
          "post-build": postBuild,
        } = toml.parse(await file.readFile("utf-8"));

        if (!config) {
          this.error(`Unable to read config from 'deepgram.toml'.`);
        }

        const command = build.command.split(" ");

        this.log(`Running build command from './${name}/deepgram.toml'`);
        this.log(`${EOL + INDENT}$ ${build.command}`);
        const buildSpawn = spawn(
          command.shift(),
          [...command, ...(build.args || []), "--color=always"],
          {
            cwd: buildDir,
          }
        );

        buildSpawn.stdout.on("data", (data: any) => {
          this.log(
            data
              .toString()
              .split(EOL)
              .join(EOL + INDENT)
          );
        });

        buildSpawn.stderr.on("data", (data: any) => {
          this.log(`Error running build from './${name}/deepgram.toml'`);
          this.error(data);
        });

        buildSpawn.on("close", async (code: Number) => {
          if (code === 0) {
            const samplePath: PathLike = `${buildDir}/${config.sample}`;
            const sampleFh = await open(samplePath, "r").catch((err) =>
              this.error(err)
            );

            if (!sampleFh) {
              this.error(`Unable to find '${config.sample}' in './${name}'`);
            }

            let sampleSrc = await sampleFh.readFile("utf-8");

            if (!sampleSrc) {
              this.error(`Unable to read '${config.sample}' in './${name}'`);
            }

            for (const key in this.appConfig) {
              if (!this.appConfig.hasOwnProperty(key)) {
                continue;
              }
              if (typeof this.appConfig[key] !== "string") {
                continue;
              }

              sampleSrc = sampleSrc.replace(
                new RegExp(`%${key}%`, "g"),
                this.appConfig[key]
              );
            }

            const configPath: PathLike = `${buildDir}/${config.output}`;
            const configFh = await open(configPath, "w+").catch((err) =>
              this.error(err)
            );

            if (!configFh) {
              this.error(`Unable to create '${config.output}' in './${name}'`);
            }

            try {
              this.log(`Config file created at './${name}/${config.output}'`);
              await configFh.writeFile(sampleSrc, "utf-8");
            } catch (err: any) {
              this.error(err);
            }

            this.log("");
            this.log(chalk.greenBright("Setup complete."));
            this.log(`Next, run 'cd ./${name}'. ${postBuild?.message}`);
          }
        });
      }
    });
  }
}
