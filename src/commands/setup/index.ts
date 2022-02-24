import { Command, Flags } from "@oclif/core";
import inquirer from "inquirer";
import { open } from "fs/promises";

const homedir = require("os").homedir();

const validateApiKey = (input: string) => {
  if (/([a-f0-9]{40})/g.test(input)) {
    return true;
  } else throw "Please provide a valid API key secret.";
};

export default class Setup extends Command {
  static prompts = [
    {
      // mask as a password
      type: "input",
      name: "api_key",
      message: "Please enter a Deepgram API Key:",
      require: true,
      validate: validateApiKey,
    },
  ];

  static args = [
    {
      name: "api_key",
      env: "deepgram_api_key",
      required: false,
      description: "Deepgram API Key.",
    },
  ];

  static description =
    "Writes a config file for the API key to a default location (can be overridden).";

  static examples = [
    `$ deepgram setup
? Please enter a Deepgram API Key ****************************************

Config file created at ~/.deepgramrc
`,
    `$ deepgram setup b63ac66256616e991af56dfa2fbdc078225e63a5

Config file created at ~/.deepgramrc
`,
  ];

  public async run(): Promise<void> {
    let {
      args: { api_key },
    } = await this.parse(Setup);
    const filePath = `${homedir}/.deepgramrc`;
    let overwrite = false;

    if (typeof api_key !== "undefined") {
      try {
        validateApiKey(api_key);
      } catch (err: any) {
        this.error(err);
      }
    } else {
      const apiKeyPrompt = await inquirer.prompt(Setup.prompts);
      api_key = apiKeyPrompt.api_key;
    }

    let file = await open(filePath, "wx").catch((err) => {
      if (err.code === "EEXIST") {
        this.log(`Existing config file ${filePath} detected.`);
        return;
      }

      throw err;
    });

    if (!file) {
      // this.log(`Existing config file ${filePath} detected.`);
      const overwritePrompt = await inquirer.prompt([
        {
          type: "confirm",
          name: "overwrite",
          message: `Overwrite it existing config file?`,
          default: overwrite,
        },
      ]);

      if (!overwritePrompt.overwrite) {
        this.error(
          `Config file ${filePath} already existed. Use cancelled overwrite.`
        );
      }

      this.log(`Overwriting the existing config file ${filePath}`);
      file = await open(filePath, "w").catch((err) => this.error(err));
    }

    this.log(`Config file created at ${filePath}`);
    const data = Buffer.from(JSON.stringify({ api_key }));
    await file.write(data).catch((err) => this.error(err));
  }
}
