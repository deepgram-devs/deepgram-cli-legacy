import SecureCommand from "../../../secure";
import inquirer from "inquirer";
import { validateProjectID } from "../../../validator/projectId";

export default class Fields extends SecureCommand {
  static args = [
    {
      name: "project",
      required: false,
      description: "Project ID",
    },
  ];

  static description = "List features used by the provided project";

  static examples = [];

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
