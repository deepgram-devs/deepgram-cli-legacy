import AuthGuard from "../../guard";
const tablize = require("jsontostringtable");

export default class ListProjects extends AuthGuard {
  static description =
    "Retrieve all projects your API key has access to manage.";

  static examples = [
    `$ deepgram projects
-----------------------------------------------------------------------
| project_id                           | name                         |
-----------------------------------------------------------------------
| 7a0e1c0f-4b5a-5449-97d3-d36b7ec11c68 | luke@lukeoliff.com's Project |
| 24c4c8c2-bfb7-48fa-a1b5-709e7dq452d0 | other project                |
-----------------------------------------------------------------------
`,
  ];

  async run(): Promise<void> {
    const { projects } = await this.deepgram.projects
      .list()
      .catch((err) => this.error(err));

    this.log(tablize(projects));
  }
}
