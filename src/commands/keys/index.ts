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

export default class Keys extends AuthGuard {
  static prompts = [
    {
      type: "input",
      name: "project",
      message: "Please enter a Project ID:",
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

  static description = "Retrieve all API keys for a given project";

  static examples = [];

  public async run(): Promise<void> {
    let { args } = await this.parse(Keys);
    args = await inquirer.prompt(Keys.prompts, args);

    const { api_keys } = await this.deepgram.keys.list(args.project);

    console.log(api_keys);
  }
}
