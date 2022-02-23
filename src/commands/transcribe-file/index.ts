import { Flags } from "@oclif/core";
import AuthGuard from "../../guard";
import inquirer from "inquirer";
import { open } from "fs/promises";
import { resolve, dirname } from "path";
import { lookup } from "mime-types";
import { PathLike } from "fs";
import wrap from "word-wrap";

export default class TranscribeFile extends AuthGuard {
  static prompts = [
    {
      type: "input",
      name: "file",
      message: "Enter a file name or path transcribe:",
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
    // can pass either --force or -f
    output: Flags.string({ char: "o", required: false }),
    webvtt: Flags.boolean({ exclusive: ["srt"] }),
    srt: Flags.boolean({ exclusive: ["webvtt"] }),
    raw: Flags.boolean(),
  };

  static description = "Transcribe a file.";

  static examples = [
    `$ deepgram transcribe-file test.mp3 --output=test.txt
File transcription saved to 'text.txt'
Transcription of 'test.mp3' successful.
`,
  ];

  public async run(): Promise<void> {
    let {
      args: { file },
      flags,
    } = await this.parse(TranscribeFile);

    if (typeof file === "undefined") {
      const answers = await inquirer.prompt(TranscribeFile.prompts);
      file = answers.template;
    }

    const filePath = resolve(file);
    const mimetype = lookup(filePath);

    if (!mimetype) {
      this.error("not a readable file type");
    }

    const fh = await open(filePath, "r").catch(() => null);

    if (!fh) {
      this.error("file can't be read");
    }

    const audioSource = {
      stream: fh.createReadStream(),
      mimetype,
    };

    let outputFormat = "plain";
    if (flags.srt) outputFormat = "srt";
    if (flags.webvtt) outputFormat = "webvtt";

    try {
      if (!flags.raw) {
        this.log(`Starting transcription of '${file}'`);
      }

      const response = await this.deepgram.transcription.preRecorded(
        audioSource,
        {
          version: "beta",
          punctuate: true,
          utterances: true,
        }
      );

      if (!flags.raw) {
        this.log(`Transcription of '${file}' successful.`);
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
        const outputFh = await open(outputFile, "w+").catch(() => null);

        if (!outputFh) {
          this.error(
            `Unable to create output file '${outputDir}/${flags.output}'`
          );
        }

        try {
          this.log(
            `File transcription saved to '${outputDir}/${flags.output}'`
          );
          await outputFh.writeFile(output, "utf-8");
        } catch (error: any) {
          this.error(error);
        }
      } else {
        if (!flags.raw) {
          this.log("");
          this.log(wrap(output, { width: 70 }));
        } else {
          this.log(output);
        }
      }
    } catch (error: any) {
      this.error(error);
    }
  }
}
