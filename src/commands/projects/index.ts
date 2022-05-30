import SecureCommand from "../../secure";

const tablize = require("jsontostringtable");

export default class ListProjects extends SecureCommand {
  static description =
    "Retrieve all Deepgram Projects your API key has access to.";

  static examples = [
    `$ deepgram projects
-----------------------------------------------------------------------
| project_id                           | name                         |
-----------------------------------------------------------------------
| 7a0e1c0f-4b5a-5449-97d3-d36b7ec11c68 | luke@lukeoliff.com's Project |
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
