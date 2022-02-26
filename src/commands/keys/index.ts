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

  static description = "Retrieve all keys for a given project";

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
      const answers = await inquirer.prompt(Keys.prompts);
      project = answers.project;
    }

    const { api_keys } = await this.deepgram.keys.list(project);

    console.log(api_keys);
  }
}
