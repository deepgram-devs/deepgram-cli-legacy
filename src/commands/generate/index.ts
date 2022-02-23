import AuthGuard from "../../guard";
import inquirer from "inquirer";

// this repo is not maintained and has issues. fork/adopt
const download = require("git-a-repo");

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
    download(template, name, (err: any) => {
      if (err) {
        this.log(`Error occured trying to clone '${template}'.`);
        this.error(err);
      } else {
        this.log(`Running 'npm install' from './${name}/deepgram.toml'`);
        this.log("");
        this.log(`Setup complete. You can now change directory to './${name}'`);
        this.log("");
        this.log(`Run 'npm start' to get up and running.`);
      }
    });
  }
}
