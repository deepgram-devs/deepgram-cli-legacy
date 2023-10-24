import { createClient } from "@deepgram/sdk";
import DeepgramClient from "@deepgram/sdk/dist/module/DeepgramClient"; // todo:
import rc from "rc";

import { BaseCommand } from "./base";

export default abstract class SecureCommand extends BaseCommand<typeof SecureCommand> {
  deepgram: DeepgramClient;
  appConfig: {
    [key: string]: string;
  } = {};
  public async init(): Promise<void> {
    rc("deepgram", this.appConfig);

    let apiKey;

    // first, look for an appConfig key
    if ("key" in this.appConfig) {
      apiKey = this.appConfig.key;
    }

    // second, look for an ENV var (so this is priority)
    if (process.env.DEEPGRAM_API_KEY) {
      apiKey = process.env.DEEPGRAM_API_KEY;
    }

    if (!apiKey) {
      this.output("");
      this.output("Oh no!", 0);
      this.output("");
      this.output("You've not yet configured the CLI with your API key.", 0);
      this.output("Sign up today and get $200 credit for free: https://dpgr.am/cli", 0);
      this.output("");
      this.output("To get started, run:", 0);
      this.output(`\`${this.config.pjson.oclif.bin} setup\``);
      this.output("");
      this.output("Or rerun the command as:", 0);
      this.output(
        `\`DEEPGRAM_API_KEY=<your key> ${this.config.pjson.oclif.bin} ${this.id} ${this.argv.join(
          " "
        )}\``,
        2,
        true
      );
      this.output("");
      this.exit();
    }

    this.deepgram = createClient(apiKey, {
      global: { url: "api.deepgram.com" },
    });

    await super.init();
  }
}
