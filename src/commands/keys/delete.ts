import AuthGuard from "../../guard";
import inquirer from "inquirer";
import { validateProjectID } from "../../validator/projectId";
import { validateApiKeyID } from "../../validator/apiKeyId";

export default class DeleteKey extends AuthGuard {
  static prompts = [
    {
      type: "input",
      name: "project",
      message: "Please enter a Project ID:",
      validate: validateProjectID,
    },
    {
      type: "input",
      name: "api_key_id",
      message: "Please enter an API key ID:",
      validate: validateApiKeyID,
    },
  ];

  static args = [
    {
      name: "project",
      required: false,
      description: "Project ID",
    },
    {
      name: "api_key_id",
      required: false,
      description: "API key ID",
    },
  ];

  static description = "Delete an API key from a project";

  static examples = [];

  public async run(): Promise<void> {
    let { args } = await this.parse(DeleteKey);
    args = await inquirer.prompt(DeleteKey.prompts, args);

    await this.deepgram.keys
      .delete(args.project, args.api_key_id)
      .catch((err) => this.error(err));

    this.log("Deepgram API key successfully deleted.");
  }
}
