import AuthCommand from "../../auth";
const tablize = require("jsontostringtable");

export default class ListProjects extends AuthCommand {
  static description =
    "Retrieve all projects your API key has access to manage.";

  static examples = [
    `$ deepgram projects
e.g. projects output! (./src/commands/projects/index.ts)
`,
  ];

  async run(): Promise<void> {
    const { projects } = await this.deepgram.projects.list();
    this.log(tablize(projects));
  }
}
