import { Flags } from "@oclif/core";
import SecureCommand from "../../secure";
// import { LogLevel } from "../../base";
import { createReadStream } from "fs";
import { PrerecordedTranscriptionResponse } from "@deepgram/sdk/dist/types";
import { LogLevel } from "../../base";

/* Used in dynamic mappings from features to flags */
/* eslint-disable @typescript-eslint/no-unused-vars */
const { string, boolean, integer } = Flags;
/* eslint-enable @typescript-eslint/no-unused-vars */
const { round } = Math;

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
    name: "diarize_version",
    type: "string",
  },
  {
    name: "multichannel",
    type: "boolean",
  },
  {
    name: "alternatives",
    type: "integer",
  },
  {
    name: "numbers",
    type: "boolean",
  },
  {
    name: "numerals",
    type: "boolean",
  },
  {
    name: "numbers_spaces",
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
    type: "string",
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
    name: "translate",
    type: "string",
    multiple: true,
  },
  {
    name: "detect_topics",
    type: "boolean",
  },
  {
    name: "sentiment",
    type: "boolean",
  },
  {
    name: "analyze_sentiment",
    type: "boolean",
  },
  {
    name: "sentiment_threshold",
    type: "integer",
  },
  {
    name: "dates",
    type: "boolean",
  },
  {
    name: "date_format",
    type: "string",
  },
  {
    name: "times",
    type: "boolean",
  },
  {
    name: "dictation",
    type: "boolean",
  },
  {
    name: "measurements",
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
  {
    name: "ner",
    type: "boolean",
  },
];

export default class Transcribe extends SecureCommand {
  static description = "Transcribe audio/video straight from the command line.";

  static flags = {
    "data-url": Flags.string({
      description: "url",
      summary: "url",
      exactlyOne: ["data-url", "data-binary"],
      exclusive: ["mimetype"],
      required: false,
    }),
    "data-binary": Flags.string({
      description: "filepath",
      summary: "filepath",
      exactlyOne: ["data-url", "data-binary"],
      dependsOn: ["mimetype"],
      required: false,
    }),
    mimetype: Flags.string({
      description: "mimetype",
      summary: "mimetype",
      required: false,
    }),
    vtt: Flags.boolean({
      description: "vtt",
      summary: "vtt",
      required: false,
      exclusive: [
        "json",
        "srt",
        "detect_language",
        "paragraphs",
        "detect_entities",
        "summarize",
        "detect_topics",
      ],
      dependsOn: ["utterances"],
    }),
    srt: Flags.boolean({
      description: "srt",
      summary: "srt",
      required: false,
      exclusive: [
        "json",
        "vtt",
        "detect_language",
        "paragraphs",
        "detect_entities",
        "summarize",
        "detect_topics",
      ],
      dependsOn: ["utterances"],
    }),
    json: Flags.boolean({
      description: "json",
      summary: "json",
      required: false,
      exclusive: ["vtt", "srt"],
    }),
    "no-transcript": Flags.boolean({
      description: "Don't output a transcript",
      summary: "No transcript",
      exclusive: ["paragraphs", "utterances", "smart_format"],
    }),
    ...Object.fromEntries(
      availableFeatures.map((feature) => {
        const type = feature.type;

        return [
          [feature.name],
          eval(type)({
            name: feature.name,
            description: `Deepgram feature: ${feature.name}`,
            multiple: feature.multiple ?? false,
            parse: feature.parse ?? null,
            required: false,
          }),
        ];
      })
    ),
  };

  public async run(): Promise<void> {
    let source;
    const {
      "data-url": url,
      "data-binary": dataBinary,
      mimetype,
    } = this.parsedFlags;

    if (url) {
      source = {
        url,
      };
    }

    if (dataBinary && mimetype) {
      if (dataBinary.startsWith("@")) {
        source = {
          stream: createReadStream(dataBinary.replace("@", "")),
          mimetype,
        };
      }
    }

    if (!source) {
      this.error("You must provide a URL, or a filepath AND mimetype");
    }

    const featureKeys = availableFeatures.map((feat: any) => feat.name);
    const features = Object.fromEntries(
      Object.entries(this.parsedFlags).filter(([name]) => {
        return featureKeys.includes(name);
      })
    );

    const response: {
      results?: {
        summary?: { short: string };
      };
    } & PrerecordedTranscriptionResponse =
      await this.deepgram.transcription.preRecorded(
        source,
        Object.assign({}, { tag: ["cli"] }, features)
      );

    const { vtt, srt, json, "no-transcript": noTranscript } = this.parsedFlags;

    /**
     * Verbatim response from the API via the @deepgram/node
     */
    if (json) {
      return this.output(JSON.stringify(response), LogLevel.error);
    }

    /**
     * Utterances response formatted with WebVTT
     */
    if (vtt) {
      return this.output(response.toWebVTT(), LogLevel.error);
    }

    /**
     * Utterances response formatted with SRT
     */
    if (srt) {
      return this.output(response.toSRT(), LogLevel.error);
    }

    /**
     * Do the rest of the outputs.
     */
    const result = response?.results;
    const channel = result?.channels[0];
    const alternative = channel?.alternatives[0];

    if (features.summarize) {
      this.title("TRANSCRIPTION SUMMARY");
      this.output("");
      this.output(
        result?.summary?.short ?? "No summary returned.",
        LogLevel.error
      );
      this.output("");
    }

    if (features.detect_topics) {
      this.title("TOPIC DETECTION");
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

          this.output(string, LogLevel.error);
        });
      } else {
        this.output("No topics returned.", LogLevel.error);
      }

      this.output("");
    }

    if (features.detect_entities) {
      this.title("ENTITY DETECTION");
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

        const entitiesByLabel: EntityGroup = entities.reduce(
          (group: EntityGroup, entity) => {
            const { label }: { label: string } = entity;
            group[label] = group[label] ?? [];
            group[label].push(entity);
            return group;
          },
          {}
        );

        Object.keys(entitiesByLabel).forEach((label: string) => {
          this.subtitle(`TYPE ${label}`);
          this.output("");
          entitiesByLabel[label].map((entity) => {
            const { value, confidence } = entity;
            const string = `${value}, ${round(confidence) * 100}%`;

            this.output(string, LogLevel.error, 4);
          });
          this.output("");
        });
      } else {
        this.output("No entities returned.", LogLevel.error);
        this.output("");
      }
    }

    if (features.detect_language) {
      this.title("LANGUAGE DETECTION");
      this.output("");

      const language = channel?.detected_language;

      if (language) {
        this.output(`Language: ${language}`, LogLevel.error);
      } else {
        this.output("No language returned.", LogLevel.error);
      }

      this.output("");
    }

    if (features.paragraphs) {
      const paragraphs = alternative?.paragraphs;

      this.title("PARAGRAPH FORMATTED");
      this.output("");

      if (paragraphs) {
        paragraphs.paragraphs.map((section) => {
          let paragraph = "";
          section.sentences.map((sentence) => {
            paragraph += ` ${sentence.text}`;
          });
          this.output(paragraph.trim(), LogLevel.error);
        });
      } else {
        this.output("No paragraphs returned.", LogLevel.error);
      }

      this.output("");
    }

    if (features.utterances) {
      const utterances = result?.utterances;

      this.title("UTTERANCE FORMATTED");
      this.output("");

      if (utterances) {
        utterances.map((utterance) => {
          this.output(utterance.transcript, LogLevel.error);
          this.output("");
        });
      } else {
        this.output("No utterances returned.", LogLevel.error);
      }

      this.output("");
    }

    if (noTranscript) this.exit();

    this.title(`${features.smart_format ? "SMART " : "UN"}FORMATTED`);
    this.output("");

    const paragraphs = alternative?.paragraphs;

    if (paragraphs) {
      paragraphs.paragraphs.map((section) => {
        let paragraph = "";
        section.sentences.map((sentence) => {
          paragraph += ` ${sentence.text}`;
        });
        this.output(paragraph.trim(), LogLevel.error);
        this.output("");
      });
    } else {
      const transcript = alternative?.transcript;

      if (transcript) {
        this.output(transcript, LogLevel.error);
      } else {
        this.output("No transcript returned.", LogLevel.error);
      }
    }
  }
}
