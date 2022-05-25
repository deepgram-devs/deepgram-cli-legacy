import SecureCommand from "../../secure";
import inquirer from "inquirer";
import { validateProjectID } from "../../validator/projectId";

export default class Usage extends SecureCommand {
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

  static description = "Retrieves aggregated usage data for a project";

  static examples = [];

  public async run(): Promise<void> {
    let { args } = await this.parse(Usage);
    args = await inquirer.prompt(Usage.prompts, args);

    const output = this.deepgram.usage.getUsage(args.project);

    this.log(JSON.stringify(output));
  }
}
