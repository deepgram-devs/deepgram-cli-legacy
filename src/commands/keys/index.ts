import SecureCommand from "../../secure";

export default class Keys extends SecureCommand {
  static args = [
    {
      name: "project",
      required: false,
      description: "Project ID",
    },
  ];

  static description = "Retrieve all API keys for a given Deepgram Project.";

  public async run(): Promise<void> {
    let { project } = this.appConfig;
    let { args } = await this.parse(Keys);

    if (args.project) {
      project = args.project;
    }

    const { api_keys } = await this.deepgram.keys.list(project);

    console.log(api_keys);
  }
}
