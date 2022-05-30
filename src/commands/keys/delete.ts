import inquirer from "inquirer";

import { validateApiKeyID } from "../../validator/apiKeyId";
import SecureCommand from "../../secure";

export default class DeleteKey extends SecureCommand {
  static prompts = [
    {
      type: "input",
      name: "api_key_id",
      message: "Please enter an API key ID:",
      validate: validateApiKeyID,
    },
  ];

  static args = [
    {
      name: "api_key_id",
      required: false,
      description: "API key ID",
    },
    {
      name: "project",
      required: false,
      description: "Project ID",
    },
  ];

  static description = "Delete an API key from a Deepgram Project.";

  public async run(): Promise<void> {
    let { project } = this.appConfig;
    let { args } = await this.parse(DeleteKey);

    if (args.project) {
      project = args.project;
    }

    args = await inquirer.prompt(DeleteKey.prompts, args);

    await this.deepgram.keys
      .delete(project, args.api_key_id)
      .catch((err) => this.error(err));

    this.log("Deepgram API key successfully deleted.");
  }
}
