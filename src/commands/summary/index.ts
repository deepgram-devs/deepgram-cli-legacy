import { Flags } from "@oclif/core";
import SecureCommand from "../../secure";

export default class Summary extends SecureCommand {
  static description = "Summarize any audio or video using just one command.";

  static flags = {
    "data-url": Flags.string({
      summary:
        "URL of an audio or video file. e.g. https://dpgr.am/spacewalk.wav",
      exactlyOne: ["data-url", "data-binary"],
      exclusive: ["mimetype"],
      required: false,
      helpGroup: "MEDIA SOURCE",
    }),
    "data-binary": Flags.string({
      summary:
        "Filepath of local audio or video file. e.g. @~/Projects/nasa.mp4",
      exactlyOne: ["data-url", "data-binary"],
      dependsOn: ["mimetype"],
      required: false,
      helpGroup: "MEDIA SOURCE",
    }),
    mimetype: Flags.string({
      summary: "Mimetype of local audio or video file.",
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
