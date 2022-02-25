import { Flags } from "@oclif/core";
import AuthGuard from "../../guard";
import inquirer from "inquirer";

import { DeviceInfo, getDevices, AudioIO, SampleFormat16Bit } from "naudiodon";

const inputDevices = (): DeviceInfo[] => {
  return getDevices().filter((i) => i.maxInputChannels > 0);
};

const decode = (data: Uint8Array) => {
  return new TextDecoder("utf-8").decode(data);
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
    let { flags } = await this.parse(TranscribeInput);

    const answers = await inquirer
      .prompt(TranscribeInput.prompts)
      .catch((err) => this.error(err));

    const selectedInput = inputDevices().find((i) => i.name == answers.input);

    if (!selectedInput) {
      this.error("An error occured finding the selected input.");
    }

    let outputFormat = "plain";
    if (flags.srt) outputFormat = "srt";
    if (flags.webvtt) outputFormat = "webvtt";

    if (!flags.raw) {
      this.log(`Listening to '${selectedInput.name}' and ready to transcribe.`);
    }

    let io = new (AudioIO as any)({
      inOptions: {
        channelCount: selectedInput.maxInputChannels,
        sampleFormat: SampleFormat16Bit,
        sampleRate: 44100,
        deviceId: selectedInput.id,
        closeOnError: false,
      },
    });

    const live = await this.deepgram.transcription.live();

    live.addListener("open", () => {
      io.on("data", (buffer: any) => live.send(buffer));
    });

    io.start();

    live.addListener("transcriptReceived", (transcription) => {
      console.log(transcription.data);
    });
  }
}
