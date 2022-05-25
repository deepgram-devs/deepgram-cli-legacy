import SecureCommand from "../../../secure";
import inquirer from "inquirer";
import { validateProjectID } from "../../../validator/projectId";

export default class Fields extends SecureCommand {
  static prompts = [
    {
      type: "input",
      name: "project",
      message: "Please enter a Project ID:",
      validate: validateProjectID,
    },
  ];

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
    let { args } = await this.parse(Fields);
    args = await inquirer.prompt(Fields.prompts, args);

    const output = this.deepgram.usage.getFields(args.project);

    this.log(JSON.stringify(output));
  }
}
