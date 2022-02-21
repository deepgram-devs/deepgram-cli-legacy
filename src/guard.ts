import { Deepgram } from "@deepgram/sdk";
import { Command } from "@oclif/core";
import chalk from "chalk";
import rc from "rc";

export default abstract class AuthGuard extends Command {
  deepgram: Deepgram;

  async init() {
    let appConfig = {
      api_key: "",
    };

    rc("deepgram", appConfig);

    if ("api_key" in appConfig && appConfig.api_key.match(/([a-f0-9]{40})/g)) {
      this.deepgram = new Deepgram(appConfig.api_key);
    } else {
      this.log("You've not yet configured the CLI with your API key.");
      this.log("Find your API Key at https://console.deepgram.com");
      this.log(`\nRun "${this.config.pjson.oclif.bin} setup" to get started.`);
      this.exit();
    }
  }
}
