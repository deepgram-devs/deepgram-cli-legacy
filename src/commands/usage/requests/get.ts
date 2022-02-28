import AuthGuard from "../../../guard";
import inquirer from "inquirer";
import { validateProjectID } from "../../../validator/projectId";
import { validateRequestID } from "../../../validator/requestId";

export default class GetRequest extends AuthGuard {
  static prompts = [
    {
      type: "input",
      name: "project",
      message: "Please enter a Project ID:",
      validate: validateProjectID,
    },
    {
      type: "input",
      name: "request",
      message: "Please enter a Request ID:",
      validate: validateRequestID,
    },
  ];

  static args = [
    {
      name: "project",
      required: false,
      description: "Project ID",
    },
    {
      name: "request",
      required: false,
      description: "Request ID",
    },
  ];

  static description =
    "Retrieves a specific transcription request for a project";

  static examples = [];

  public async run(): Promise<void> {
    let { args } = await this.parse(GetRequest);
    args = await inquirer.prompt(GetRequest.prompts, args);

    const output = this.deepgram.usage.getRequest(args.project, args.request);

    this.log(JSON.stringify(output));
  }
}
