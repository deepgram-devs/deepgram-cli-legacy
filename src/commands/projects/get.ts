import AuthCommand from "../../auth";
import inquirer from "inquirer";
const tablize = require("jsontostringtable");

export default class GetProject extends AuthCommand {
  static prompts = [
    {
      type: "input",
      name: "project",
      message: "Please enter a Project ID",
    },
  ];

  static args = [
    {
      name: "project",
      required: false,
      description: "Project ID",
    },
  ];

  static description =
    "Retrieve all projects your API key has access to manage.";

  static examples = [
    `$ deepgram projects
e.g. projects output! (./src/commands/projects/index.ts)
`,
  ];

  async run(): Promise<void> {
    const { args } = await this.parse(GetProject);

    Promise.resolve()
      .then(() => {
        if (typeof args.project === "undefined") {
          return inquirer.prompt(GetProject.prompts).then((answers) => {
            args.project = answers.project;
          });
        }
      })
      .then(() => {
        return this.deepgram.projects.get(args.project);
      })
      .then((project) => {
        this.log(tablize([project]));
      });
  }
}
