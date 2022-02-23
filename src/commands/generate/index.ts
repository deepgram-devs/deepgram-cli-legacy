import AuthGuard from "../../guard";
import inquirer from "inquirer";
import { open } from "fs/promises";
import { PathLike, constants } from "fs";
import toml from "toml";
import path from "path";

const download = require("git-a-repo");
const { spawn } = require("child_process");

export default class Generate extends AuthGuard {
  static prompts = [
    {
      type: "input",
      name: "template",
      message: "Enter a template name or a template repo URL:",
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

  static examples = [
    `$ deepgram generate deepgram-templates/video-chat
? Enter a template name or a template repo URL: deepgram-templates/video-chat
Cloning 'deepgram-templates/video-chat' to './video-chat'
Running 'npm install' from './video-chat/deepgram.toml'

Setup complete. You can now change into './video-chat'.

Run 'npm start' to get up and running.
`,
    `$ deepgram generate
Cloning 'deepgram-templates/video-chat' to './video-chat'
Running 'npm install' from './video-chat/deepgram.toml'

Setup complete. You can now change into './video-chat'.

Run 'npm start' to get up and running.
`,
  ];

  public async run(): Promise<void> {
    let {
      args: { template },
    } = await this.parse(Generate);

    if (typeof template === "undefined") {
      const answers = await inquirer.prompt(Generate.prompts);
      template = answers.template;
    }

    // extract the folder name from the repo or url provided
    const name = template
      .replace(/\/$/, "")
      .split("/")
      .pop()
      .split(".")
      .shift();

    this.log(`Cloning '${template}' to './${name}'`);
    download(template, name, async (err: any) => {
      if (err) {
        this.log(`Error occured trying to clone '${template}'.`);
        this.error(err);
      } else {
        const buildDir: PathLike = path.resolve(`./${name}`);
        const tomlPath: PathLike = `${buildDir}/deepgram.toml`;

        const file = await open(tomlPath, "r").catch(() => null);

        if (!file) {
          this.error(
            `The template project '${template}' has no 'deepgram.toml'`
          );
        }

        const config = toml.parse(await file.readFile("utf-8"));

        if (!config) {
          this.error(`Unable to read config from 'deepgram.toml'.`);
        }

        const command = config.build.command.split(" ");
        const build = spawn(command.shift(), [...command], { cwd: buildDir });

        build.stdout.on("data", (data: any) => {
          this.log(`stdout: ${data}`);
        });

        build.stderr.on("data", (data: any) => {
          this.error(`stderr: ${data}`);
        });

        build.on("error", (err: any) => {
          this.error(err);
        });

        build.on("close", (code: any) => {
          this.log(`child process exited with code ${code}`);
        });
      }
    });
  }
}
