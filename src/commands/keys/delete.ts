import AuthGuard from "../../guard";
import inquirer from "inquirer";

const uuidPattern =
  /\b[a-f0-9]{8}\b-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-\b[a-f0-9]{12}\b/;

const validateUuid = (input: string) => {
  if (uuidPattern.test(input)) {
    return true;
  }

  throw Error("Please provide a valid ID.");
};

export default class DeleteKey extends AuthGuard {
  static prompts = [
    {
      type: "input",
      name: "project",
      message: "Please enter a Project ID:",
      validate: validateUuid,
    },
    {
      type: "input",
      name: "api_key_id",
      message: "Please enter a API key ID:",
      validate: validateUuid,
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

  static examples = [
    `$ deepgram keys
? Please enter a Project ID 24c4c8c2-bfb7-48fa-a1b5-709e7dq452d0
...
`,
    `$ deepgram keys 7a0e1c0f-4b5a-5449-97d3-d36b7ec11c68
...
`,
  ];

  public async run(): Promise<void> {
    let { args } = await this.parse(DeleteKey);
    args = await inquirer.prompt(DeleteKey.prompts, args);

    await this.deepgram.keys
      .delete(args.project, args.api_key_id)
      .catch((err) => this.error(err));

    this.log("Deepgram API key successfully deleted.");
  }
}
