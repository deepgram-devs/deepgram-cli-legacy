import AuthGuard from "../../guard";
import inquirer from "inquirer";
const tablize = require("jsontostringtable");

const uuidPattern =
  /\b[a-f0-9]{8}\b-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-\b[a-f0-9]{12}\b/;

const validateUuid = (input: string) => {
  if (uuidPattern.test(input)) {
    return true;
  }

  throw Error("Please provide a valid ID.");
};

const validateApiKeyName = (input: string) => {
  if (input !== "") {
    return true;
  }

  throw Error("Please provide a name for the API key.");
};

export default class Keys extends AuthGuard {
  static prompts = [
    {
      type: "input",
      name: "project",
      message: "Please enter a Project ID:",
      require: true,
      validate: validateUuid,
    },
  ];

  static args = [
    {
      name: "project",
      required: false,
      description: "Project ID",
    },
  ];

  static description = "Create an API key for a project";

  static examples = [
    `$ deepgram keys create
? Please enter a Project ID 24c4c8c2-bfb7-48fa-a1b5-709e7dq452d0
...
`,
    `$ deepgram keys 7a0e1c0f-4b5a-5449-97d3-d36b7ec11c68
...
`,
  ];

  public async run(): Promise<void> {
    let {
      args: { project },
    } = await this.parse(Keys);

    if (typeof project !== "undefined") {
      try {
        validateUuid(project);
      } catch (err: any) {
        this.error(err);
      }
    } else {
      project = (await inquirer.prompt(Keys.prompts)).project;
    }

    const answers = await inquirer.prompt([
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
        required: true,
      },
      {
        type: "input",
        name: "comment",
        message: "Name your API key:",
        validate: validateApiKeyName,
      },
    ]);

    const key = await this.deepgram.keys
      .create(project, answers.comment, [answers.permission])
      .catch((err) => this.error(err));

    this.log(tablize([key]));
  }
}
