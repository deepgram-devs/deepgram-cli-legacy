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
