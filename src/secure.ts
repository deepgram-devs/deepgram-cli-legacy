import { createClient } from "@deepgram/sdk";
import DeepgramClient from "@deepgram/sdk/dist/module/DeepgramClient"; // todo:
import rc from "rc";

import { BaseCommand } from "./base";

export default abstract class SecureCommand extends BaseCommand<
  typeof SecureCommand
> {
  deepgram: DeepgramClient;
  appConfig: {
    [key: string]: string;
  } = {};
  public async init(): Promise<void> {
    rc("deepgram", this.appConfig);
    if (
      "key" in this.appConfig &&
      this.appConfig.key.match(/([a-f0-9]{40})/g)
    ) {
      this.deepgram = createClient(this.appConfig.key, {
        global: { url: "api.beta.deepgram.com" },
      });
    } else {
      this.log("You've not yet configured the CLI with your API key.");
      this.log(
        "Sign up today and get $200 credit for free: https://dpgr.am/cli"
      );
      this.log(`\nRun "${this.config.pjson.oclif.bin} setup" to get started.`);
      this.exit();
    }

    await super.init();
  }
}
