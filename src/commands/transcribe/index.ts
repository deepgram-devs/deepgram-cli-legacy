import { Flags } from "@oclif/core";
import SecureCommand from "../../secure";
import { createReadStream } from "fs";
import { homedir } from "os";
import path from "path";
import {
  DeepgramResponse,
  FileSource,
  PrerecordedSchema,
  SyncPrerecordedResponse,
  UrlSource,
} from "@deepgram/sdk";

/* Used in dynamic mappings from features to flags */
/* eslint-disable @typescript-eslint/no-unused-vars */
const { string, boolean, integer } = Flags;
/* eslint-enable @typescript-eslint/no-unused-vars */
const { round } = Math;

const homeDir = homedir();

const availableFeatures: {
  name: string;
  type: string;
  multiple?: boolean;
  parse?: (input: any) => any;
}[] = [
  {
    name: "model",
    type: "string",
  },
  {
    name: "version",
    type: "string",
  },
  {
    name: "tier",
    type: "string",
  },
  {
    name: "replace",
    type: "string",
    multiple: true,
  },
  {
    name: "language",
    type: "string",
  },
  {
    name: "punctuate",
    type: "boolean",
  },
  {
    name: "profanity_filter",
    type: "boolean",
  },
  {
    name: "redact",
    type: "string",
    multiple: true,
  },
  {
    name: "diarize",
    type: "boolean",
  },
  {
    name: "multichannel",
    type: "boolean",
  },
  {
    name: "search",
    type: "string",
    multiple: true,
  },
  {
    name: "callback",
    type: "string",
  },
  {
    name: "keywords",
    type: "string",
    multiple: true,
  },
  {
    name: "keyword_boost",
    type: "boolean",
    parse: async (input) => (input ? "legacy" : false),
  },
  {
    name: "utterances",
    type: "boolean",
  },
  {
    name: "utt_split",
    type: "integer",
  },
  {
    name: "detect_language",
    type: "boolean",
  },
  {
    name: "paragraphs",
    type: "boolean",
  },
  {
    name: "detect_entities",
    type: "boolean",
  },
  {
    name: "summarize",
    type: "boolean",
    parse: async (input) => (input ? "v2" : false),
  },
  {
    name: "detect_topics",
    type: "boolean",
  },
  {
    name: "smart_format",
    type: "boolean",
  },
  {
    name: "tag",
    type: "string",
    multiple: true,
  },
];

export default class Transcribe extends SecureCommand {
  static description = "Transcribe audio/video straight from the command line";

  static examples = [
    "<%= config.bin %> <%= command.id %> --data-url=https://dpgr.am/spacewalk.wav",
    "<%= config.bin %> <%= command.id %> --data-url=https://dpgr.am/spacewalk.wav --smart_format",
    "<%= config.bin %> <%= command.id %> --data-url=https://dpgr.am/spacewalk.wav",
    "<%= config.bin %> <%= command.id %> --data-url=https://dpgr.am/spacewalk.wav",
  ];

  static flags = {
    "data-url": Flags.string({
      description: "URL of an audio or video file",
      summary: "https://dpgr.am/data-url",
      exactlyOne: ["data-url", "data-binary"],
      required: false,
      helpGroup: "MEDIA SOURCE",
    }),
    "data-binary": Flags.string({
      description: "Filepath of local audio or video file",
      summary: "https://dpgr.am/data-binary",
      exactlyOne: ["data-url", "data-binary"],
      required: false,
      helpGroup: "MEDIA SOURCE",
    }),
    json: Flags.boolean({
      description: "Output JSON format of the response. This comes verbatim from the API",
      required: false,
      exclusive: ["vtt", "srt"],
      helpGroup: "FORMATTING",
    }),
    "no-transcript": Flags.boolean({
      description: "Disable transcript so you can output understanding features",
      exclusive: ["paragraphs", "utterances", "smart_format", "json"],
      helpGroup: "FORMATTING",
    }),
    ...Object.fromEntries(
      availableFeatures.map((feature) => {
        const type = feature.type;

        return [
          [feature.name],
          eval(type)({
            description: `Deepgram feature: ${feature.name}`,
            summary: `https://dpgr.am/${feature.name}`,
            name: feature.name,
            multiple: feature.multiple ?? false,
            parse: feature.parse ?? null,
            required: false,
            helpGroup: "DEEPGRAM FEATURES",
          }),
        ];
      })
    ),
  };

  private async transcribeFile(
    source: FileSource,
    options: PrerecordedSchema
  ): Promise<DeepgramResponse<SyncPrerecordedResponse>> {
    return await this.deepgram.listen.prerecorded.transcribeFile(source, options);
  }

  private async transcribeUrl(
    source: UrlSource,
    options: PrerecordedSchema
  ): Promise<DeepgramResponse<SyncPrerecordedResponse>> {
    return await this.deepgram.listen.prerecorded.transcribeUrl(source, options);
  }

  public async run(): Promise<void> {
    let urlSource, fileSource;
    const { flags } = await this.parse(Transcribe);
    let { "data-url": url, "data-binary": dataBinary } = flags;

    if (url) {
      urlSource = {
        url,
      };
    }

    if (dataBinary) {
      if (dataBinary.startsWith("@")) {
        dataBinary = dataBinary.replace("@", "");

        if (dataBinary.startsWith("~")) {
          dataBinary = path.join(homeDir, dataBinary.slice(1));
        }

        fileSource = createReadStream(dataBinary);
      }
    }

    if (!urlSource && !fileSource) {
      this.error("You must provide a URL, or a filepath.");
    }

    const featureKeys = availableFeatures.map((feat: any) => feat.name);
    const features = Object.fromEntries(
      Object.entries(flags).filter(([name]) => {
        return featureKeys.includes(name);
      })
    );

    let result;

    if (urlSource) {
      const { result: transcriptionResult, error: transcriptionError } = await this.transcribeUrl(
        urlSource,
        features
      );

      if (transcriptionError) {
        this.error(transcriptionError.message);
      }

      result = transcriptionResult;
    }

    if (fileSource) {
      const { result: transcriptionResult, error: transcriptionError } = await this.transcribeFile(
        fileSource,
        features
      );

      if (transcriptionError) {
        this.error(transcriptionError.message);
      }

      result = transcriptionResult;
    }

    const { vtt, srt, json, "no-transcript": noTranscript } = flags;

    /**
     * Verbatim response from the API via the @deepgram/node
     */
    if (json) {
      return this.output(JSON.stringify(result));
    }

    // /**
    //  * Utterances response formatted with WebVTT
    //  */
    // if (vtt) {
    //   return this.output(response.toWebVTT());
    // }

    // /**
    //  * Utterances response formatted with SRT
    //  */
    // if (srt) {
    //   return this.output(response.toSRT());
    // }

    /**
     * Do the rest of the outputs.
     */
    const channel = result?.results.channels[0];
    const alternative = channel?.alternatives[0];

    if (features.summarize) {
      this.output("TRANSCRIPTION SUMMARY");
      this.output("");
      this.output(result?.results.summary?.short ?? "No summary returned");
      this.output("");
    }

    if (features.detect_topics) {
      this.output("TOPIC DETECTION");
      this.output("");
      let topics: { confidence: number; topic: string }[] = [];

      alternative?.topics?.forEach((segment) => {
        segment.topics.forEach((topic) => {
          topics.push(topic);
        });
      });

      if (topics.length > 0) {
        topics.map((t) => {
          const { topic, confidence } = t;
          const string = `${topic}, ${round(confidence) * 100}%`;

          this.output(string);
        });
      } else {
        this.output("No topics returned");
      }

      this.output("");
    }

    if (features.detect_entities) {
      this.output("ENTITY DETECTION");
      this.output("");

      const entities = alternative?.entities;

      if (entities && entities.length > 0) {
        interface EntityGroup {
          [label: string]: Entity[];
        }

        interface Entity {
          label: string;
          confidence: number;
          value: string;
        }

        const entitiesByLabel: EntityGroup = entities.reduce((group: EntityGroup, entity) => {
          const { label }: { label: string } = entity;
          group[label] = group[label] ?? [];
          group[label].push(entity);
          return group;
        }, {});

        Object.keys(entitiesByLabel).forEach((label: string) => {
          this.output(`TYPE ${label}`);
          this.output("");
          entitiesByLabel[label].map((entity) => {
            const { value, confidence } = entity;
            const string = `${value}, ${round(confidence) * 100}%`;

            this.output(string);
          });
          this.output("");
        });
      } else {
        this.output("No entities returned");
        this.output("");
      }
    }

    if (features.detect_language) {
      this.output("LANGUAGE DETECTION");
      this.output("");

      const language = channel?.detected_language;

      if (language) {
        this.output(`Language: ${language}`);
      } else {
        this.output("No language returned");
      }

      this.output("");
    }

    if (features.paragraphs) {
      const paragraphs = alternative?.paragraphs;

      this.output("PARAGRAPH FORMATTED");
      this.output("");

      if (paragraphs) {
        paragraphs.paragraphs.map((section) => {
          let paragraph = "";
          section.sentences.map((sentence) => {
            paragraph += ` ${sentence.text}`;
          });
          this.output(paragraph.trim());
        });
      } else {
        this.output("No paragraphs returned");
      }

      this.output("");
    }

    if (features.utterances) {
      const utterances = result?.results.utterances;

      this.output("UTTERANCE FORMATTED");
      this.output("");

      if (utterances) {
        utterances.map((utterance) => {
          this.output(utterance.transcript);
          this.output("");
        });
      } else {
        this.output("No utterances returned");
      }

      this.output("");
    }

    if (noTranscript) this.exit();

    this.output(`${features.smart_format ? "SMART " : "UN"}FORMATTED`);
    this.output("");

    const paragraphs = alternative?.paragraphs;

    if (paragraphs) {
      paragraphs.paragraphs.map((section) => {
        let paragraph = "";
        section.sentences.map((sentence) => {
          paragraph += ` ${sentence.text}`;
        });
        this.output(paragraph.trim());
        this.output("");
      });
    } else {
      const transcript = alternative?.transcript;

      if (transcript) {
        this.output(transcript);
      } else {
        this.output("No transcript returned");
      }
    }
  }
}
