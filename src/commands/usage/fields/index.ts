import SecureCommand from "../../../secure";

export default class Fields extends SecureCommand {
  static args = [
    {
      name: "project",
      required: false,
      description: "Project ID",
    },
  ];

  static description = "List features used by a Deepgram Project.";

  public async run(): Promise<void> {
    let { project } = this.appConfig;
    let { args } = await this.parse(Fields);

    if (args.project) {
      project = args.project;
    }

    const output = this.deepgram.usage.getFields(project);

    this.log(JSON.stringify(output));
  }
}
