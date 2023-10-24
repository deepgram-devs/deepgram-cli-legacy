import starters from "../../starters.json";
import { Args, Flags } from "@oclif/core";
import SecureCommand from "../../secure";

export default class Starter extends SecureCommand {
  static args = {
    repository: Args.string({
      name: "repository",
      required: false,
      description: "Repository to create a starter from",
    }),
  };

  static flags = {
    select: Flags.boolean({
      name: "select",
      required: false,
      description: "Select from the Starter library",
    }),
  };

  static description = "Generate a Deepgram starter app.";

  public async run(): Promise<void> {
    console.log(this.deepgram, starters);
  }
}
