import AuthGuard from "../../guard";
import inquirer from "inquirer";
import { validateProjectID } from "../../validator/projectId";
const tablize = require("jsontostringtable");

validateProjectID;

export default class GetProject extends AuthGuard {
  static prompts = [
    {
      type: "input",
      name: "project",
      message: "Please enter a Project ID:",
      validate: validateProjectID,
    },
  ];

  static args = [
    {
      name: "project",
      required: false,
      description: "Project ID",
    },
  ];

  static description = "Retrieve a project your API key has access to manage.";

  static examples = [
    `$ deepgram project get
? Please enter a Project ID 24c4c8c2-bfb7-48fa-a1b5-709e7dq452d0
-----------------------------------------------------------------------
| project_id                           | name                         |
-----------------------------------------------------------------------
| 24c4c8c2-bfb7-48fa-a1b5-709e7dq452d0 | other project                |
-----------------------------------------------------------------------
`,
    `$ deepgram projects get 7a0e1c0f-4b5a-5449-97d3-d36b7ec11c68
-----------------------------------------------------------------------
| project_id                           | name                         |
-----------------------------------------------------------------------
| 7a0e1c0f-4b5a-5449-97d3-d36b7ec11c68 | luke@lukeoliff.com's Project |
-----------------------------------------------------------------------
`,
  ];

  async run(): Promise<void> {
    let { args } = await this.parse(GetProject);
    args = await inquirer.prompt(GetProject.prompts, args);

    const project = await this.deepgram.projects
      .get(args.project)
      .catch((err) => this.error(err));

    this.log(tablize([project]));
  }
}
