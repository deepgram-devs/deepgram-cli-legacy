import { Flags } from "@oclif/core";
import AuthGuard from "../../guard";
import inquirer from "inquirer";
// import { open } from "fs/promises";
// import { resolve, dirname } from "path";
// import { lookup } from "mime-types";
// import { createReadStream, fstat, PathLike } from "fs";
// import wrap from "word-wrap";
// import { supported } from "supported-formats";

import { DeviceInfo, getDevices } from "naudiodon";

const inputDevices = (): DeviceInfo[] => {
  return getDevices().filter((i) => i.maxInputChannels > 0);
};

export default class TranscribeInput extends AuthGuard {
  static prompts = [
    {
      type: "list",
      name: "input",
      message: "Select an input to capture audio from:",
      choices: inputDevices,
    },
    {
      type: "confirm",
      name: "save",
      message: "Do you want to record the audio to disk?",
    },
  ];

  static flags = {
    output: Flags.string({ char: "o", required: false }),
    webvtt: Flags.boolean({ exclusive: ["srt"] }),
    srt: Flags.boolean({ exclusive: ["webvtt"] }),
    raw: Flags.boolean(),
  };

  static description = "Transcribe from a live input.";

  static examples = [
    `$ deepgram transcribe-source
`,
  ];

  public async run(): Promise<void> {
    // let { flags } = await this.parse(TranscribeInput);

    const answers = await inquirer
      .prompt(TranscribeInput.prompts)
      .catch((err) => this.error(err));

    const selectedInput = inputDevices().find((i) => i.name == answers.input);
  }
}
