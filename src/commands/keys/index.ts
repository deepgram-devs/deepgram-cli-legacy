import AuthGuard from "../../guard";
import inquirer from "inquirer";
import { validateProjectID } from "../../validator/projectId";

export default class Keys extends AuthGuard {
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

  static description = "Retrieve all API keys for a given project";

  static examples = [];

  public async run(): Promise<void> {
    let { args } = await this.parse(Keys);
    args = await inquirer.prompt(Keys.prompts, args);

    const { api_keys } = await this.deepgram.keys.list(args.project);

    console.log(api_keys);
  }
}
