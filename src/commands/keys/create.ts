import SecureCommand from "../../secure";
import inquirer from "inquirer";

import { validateApiKeyName } from "../../validator/apiKeyName";

const tablize = require("jsontostringtable");

export default class CreateKey extends SecureCommand {
  static prompts = [
    {
      type: "list",
      name: "permission",
      message:
        "Select a permission level. More info here https://developers.deepgram.com/documentation/getting-started/roles/#account-roles:",
      choices: [
        {
          short: "Owner",
          value: "owner",
          name: `Owner: Full access to create transcripts, manage team members and API keys,
and change project and billing settings. Permission to monitor usage and logs.`,
        },
        {
          short: "Admin",
          value: "admin",
          name: `Admin: Ability to create transcripts and manage team members and API keys.
Permission to monitor project balances, usage, and logs.`,
        },
        {
          short: "Member",
          value: "member",
          name: `Member: Permission to create transcripts and monitor usage and logs. Limited
access to manage team members and API keys.`,
        },
      ],
    },
    {
      type: "input",
      name: "comment",
      message: "Name your API key:",
      validate: validateApiKeyName,
    },
  ];

  static args = [
    {
      name: "project",
      required: false,
      description: "Project ID",
    },
  ];

  static description =
    "Create an API key for a Deepgram Project. By default, it uses the Deepgram Project in config.";

  static examples = [];

  public async run(): Promise<void> {
    let { project } = this.appConfig;
    let { args } = await this.parse(CreateKey);

    if (args.project) {
      project = args.project;
    }

    args = await inquirer.prompt(CreateKey.prompts, args);

    const key = await this.deepgram.keys
      .create(project, args.comment, [args.permission])
      .catch((err) => this.error(err));

    this.log(tablize([key]));
  }
}
