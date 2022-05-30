import SecureCommand from "../../secure";

const tablize = require("jsontostringtable");

export default class GetProject extends SecureCommand {
  static args = [
    {
      name: "project",
      required: false,
      description: "Project ID",
    },
  ];

  static description = "Retrieve a Deepgram Project.";

  static examples = [
    `$ deepgram projects get
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
    let { project } = this.appConfig;
    let { args } = await this.parse(GetProject);

    if (args.project) {
      project = args.project;
    }

    const result = await this.deepgram.projects
      .get(project)
      .catch((err) => this.error(err));

    this.log(tablize([result]));
  }
}
