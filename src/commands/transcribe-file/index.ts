import { createReadStream, PathLike } from "fs";
import { Flags } from "@oclif/core";
import { lookup } from "mime-types";
import { open } from "fs/promises";
import { resolve, dirname } from "path";
import { supported } from "supported-formats";
import inquirer from "inquirer";
import wrap from "word-wrap";

import { validatePathLike } from "../../validator/validatePathLike";
import SecureCommand from "../../secure";

const homedir = require("os").homedir();

// work-around for improperly declared response class
import { PrerecordedTranscriptionResponse as PrerecordedTranscriptionBase } from "@deepgram/sdk/dist/types";

class PrerecordedTranscriptionResponse extends PrerecordedTranscriptionBase {
  err_code?: string;
  err_msg?: string;
}

export default class TranscribeFile extends SecureCommand {
  static prompts = [
    {
      type: "input",
      name: "file",
      message: "Enter a file name or path to transcribe:",
      validate: validatePathLike,
    },
  ];

  static args = [
    {
      name: "file",
      required: false,
      description: "File name or path",
    },
  ];

  static flags = {
    output: Flags.string({ char: "o", required: false }),
    webvtt: Flags.boolean({ exclusive: ["srt"] }),
    srt: Flags.boolean({ exclusive: ["webvtt"] }),
    raw: Flags.boolean(),
  };

  static description = "Transcribe a file.";

  public async run(): Promise<void> {
    let { args, flags } = await this.parse(TranscribeFile);
    args = await inquirer.prompt(TranscribeFile.prompts, args);
    args.file = args.file.replace(/^~\//, `${homedir}/`);

    const filePath = resolve(args.file);

    try {
      supported(filePath);
    } catch (err: any) {
      this.error(err);
    }

    const fh = await open(filePath, "r").catch((err) => this.error(err));

    if (!fh) {
      this.error(`The file '${filePath}' cannot be read`);
    }

    const mimetype = lookup(filePath);

    if (!mimetype) {
      this.error(`Cannot read mimetype from '${filePath}'`);
    }

    let stream;
    if (typeof fh.createReadStream === "function") {
      stream = fh.createReadStream();
    } else {
      stream = createReadStream(filePath);
    }

    if (!stream) {
      this.error(`Cannot read file stream from '${filePath}'`);
    }

    const audioSource = {
      stream,
      mimetype,
    };

    let outputFormat = "plain";
    if (flags.srt) outputFormat = "srt";
    if (flags.webvtt) outputFormat = "webvtt";

    if (!flags.raw) {
      this.log(`Starting transcription of '${args.file}'`);
    }

    const response: PrerecordedTranscriptionResponse =
      await this.deepgram.transcription
        .preRecorded(audioSource, {
          version: "latest",
          punctuate: true,
        })
        .catch((err: any) => this.error(err));

    if (!response.results) {
      if (response.err_msg) {
        this.error(
          `Transcription of '${args.file}' failed: ${response.err_msg}`
        );
      }

      this.error(`Transcription of '${args.file}' failed.`);
    }

    if (!flags.raw) {
      this.log(`Transcription of '${args.file}' successful.`);
    }

    let output;

    switch (outputFormat) {
      case "srt":
        output = response.toSRT();
        break;

      case "webvtt":
        output = response.toWebVTT();
        break;

      default:
        output = response.results?.channels[0].alternatives[0].transcript;
        break;
    }

    if (!output) {
      this.error("An unknown formatting error has occured");
    }

    if (flags.output) {
      const outputDir: PathLike = dirname(filePath);
      const outputFile: PathLike = `${outputDir}/${flags.output}`;
      const outputFh = await open(outputFile, "w+").catch((err) =>
        this.error(err)
      );

      if (!outputFh) {
        this.error(
          `Unable to create output file '${outputDir}/${flags.output}'`
        );
      }

      try {
        this.log(`File transcription saved to '${outputDir}/${flags.output}'`);
        await outputFh
          .writeFile(output, "utf-8")
          .catch((err) => this.error(err));
      } catch (err: any) {
        this.error(err);
      }
    } else {
      if (!flags.raw) {
        this.log("");
        this.log(wrap(output, { width: 70 }));
      } else {
        this.log(output);
      }
    }
  }
}
