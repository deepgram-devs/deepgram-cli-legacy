import SecureCommand from "../../../secure";
import inquirer from "inquirer";
import { validateProjectID } from "../../../validator/projectId";
import { validateRequestID } from "../../../validator/requestId";

export default class GetRequest extends SecureCommand {
  static prompts = [
    {
      type: "input",
      name: "request",
      message: "Please enter a Request ID:",
      validate: validateRequestID,
    },
  ];

  static args = [
    {
      name: "request",
      required: false,
      description: "Request ID",
    },
    {
      name: "project",
      required: false,
      description: "Project ID",
    },
  ];

  static description =
    "Retrieves a specific transcription request for a project";

  static examples = [];

  public async run(): Promise<void> {
    let { project } = this.appConfig;
    let { args } = await this.parse(GetRequest);
    args = await inquirer.prompt(GetRequest.prompts, args);

    if (args.project) {
      project = args.project;
    }

    const output = this.deepgram.usage.getRequest(project, args.request);

    this.log(JSON.stringify(output));
  }
}
