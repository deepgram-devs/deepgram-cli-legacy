import SecureCommand from "../../secure";
import inquirer from "inquirer";
import { validateProjectID } from "../../validator/projectId";

export default class Keys extends SecureCommand {
  static args = [
    {
      name: "project",
      required: false,
      description: "Project ID",
    },
  ];

  static description =
    "Retrieve all API keys for a given Deepgram Project. By default, it uses the Deepgram Project in config.";

  static examples = [];

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
