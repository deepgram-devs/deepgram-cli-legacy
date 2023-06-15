import { Flags } from "@oclif/core";
import { BaseCommand } from "../../base";

export default class Setup extends BaseCommand<typeof Setup> {
  // static flags = {
  //   key: Flags.string({
  //     char: "k",
  //     summary: "Deepgram API key. Read more: dpgr.am/cli",
  //     description:
  //       "The Deepgram API key relates to a project. A project is used to manage members, usage, and billing. Read more: dpgr.am/cli",
  //     env: "DEEPGRAM_API_KEY",
  //   }),
  // };

  // static description =
  //   "Writes the API key and Deepgram Project to a config file (can be overridden).";

  static examples = [
    "<%= config.bin %> <%= command.id %>",
    "<%= config.bin %> <%= command.id %> --json",
    "<%= config.bin %> <%= command.id %> --log-level debug",
  ];

  static flags = {
    name: Flags.string({
      char: "n",
      summary: "Name to print.",
      required: false,
      prompt: true,
    }),
  };

  public async run(): Promise<void> {
    super.run();
    // for (const [flag, value] of Object.entries(this.flags)) {
    //   this.log(`${flag}: ${value}`);
    // }

    // return this.flags;
  }
}
