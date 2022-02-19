import { Deepgram } from "@deepgram/sdk";
import { Command } from "@oclif/core";
import { string } from "@oclif/core/lib/flags";
import rc from "rc";

export default abstract class extends Command {
  deepgram: Deepgram;

  async init() {
    let appConfig = {
      api_key: "",
    };

    rc("deepgram", appConfig);

    if ("api_key" in appConfig) {
      this.deepgram = new Deepgram(appConfig.api_key);
    } else {
      this.log(
        "Send requests to the API with your project's API Key. You can find a Deepgram API Key in the Deepgram Console (https://console.deepgram.com)"
      );

      this.exit();
    }
  }
}
