import SecureCommand from "../../secure";

export default class Usage extends SecureCommand {
  static args = [
    {
      name: "project",
      required: false,
      description: "Project ID",
    },
  ];

  static description =
    "Retrieves aggregated usage data for a Deepgram Project. By default, it uses the Deepgram Project in config.";

  static examples = [];

  public async run(): Promise<void> {
    let { project } = this.appConfig;
    let { args } = await this.parse(Usage);

    if (args.project) {
      project = args.project;
    }

    const output = this.deepgram.usage.getUsage(project);

    this.log(JSON.stringify(output));
  }
}
