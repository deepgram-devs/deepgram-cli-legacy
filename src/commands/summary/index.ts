import { Flags } from "@oclif/core";
import SecureCommand from "../../secure";

export default class Summary extends SecureCommand {
  static description = "Summarize any audio or video using just one command.";

  static flags = {
    "data-url": Flags.string({
      description: "URL of an audio or video file",
      summary: "https://dpgr.am/data-url",
      exactlyOne: ["data-url", "data-binary"],
      exclusive: ["mimetype"],
      default: "https://dpgr.am/spacewalk.wav",
      required: false,
      helpGroup: "MEDIA SOURCE",
    }),
    "data-binary": Flags.string({
      description: "Filepath of local audio or video file",
      summary: "https://dpgr.am/data-binary",
      exactlyOne: ["data-url", "data-binary"],
      dependsOn: ["mimetype"],
      default: "@~/Projects/nasa.mp4",
      required: false,
      helpGroup: "MEDIA SOURCE",
    }),
    mimetype: Flags.string({
      description: "Mimetype of local audio or video file",
      required: false,
      helpGroup: "MEDIA SOURCE",
    }),
  };

  public async run(): Promise<void> {
    const result = await this.config.runCommand("transcribe", [
      "--summarize",
      "--no-transcript",
      ...Object.entries(this.parsedFlags).map(
        ([flag, value]) => `--${flag}=${value}`
      ),
    ]);
  }
}
