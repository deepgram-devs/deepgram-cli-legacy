import { Command, Config, Flags } from "@oclif/core";
import { FlagInput, CompletableFlag } from "@oclif/core/lib/interfaces/parser";
import { input } from "@inquirer/prompts";
import tty from "tty";
import wordwrap from "wordwrap";

export enum LogLevel {
  debug = 3,
  info = 2,
  warn = 1,
  error = 0,
}

type PromptableFlag<T> = CompletableFlag<T> & {
  prompt?: boolean;
};

export abstract class BaseCommand<T extends typeof Command> extends Command {
  static baseFlags = {
    "log-level": Flags.custom<LogLevel>({
      summary: "Specify level for logging.",
      default: LogLevel.warn,
      options: Object.keys(LogLevel),
      helpGroup: "GLOBAL",
      parse: async (input: string) => LogLevel[input as keyof typeof LogLevel],
    })(),
  };

  protected parsedFlags: {
    [flag: string]: any;
  };
  protected flags!: FlagInput;

  constructor(argv: string[], config: Config) {
    super(argv, config);

    /**
     * if a user has turned off interactivity, or this command is run without a
     * TTY, make promptable flags required flags
     **/
    if (
      !tty.isatty(process.stdin.fd) ||
      process.env.DEEPGRAM_CLI_NON_INTERACTIVE === "1" ||
      process.env.CI === "1"
    ) {
      const flagArray = Object.entries(this.ctor.flags);
      flagArray.forEach(
        ([, flag]: [string, PromptableFlag<T>], index: number) => {
          if (flag.prompt) {
            flagArray[index][1].required = flag.prompt;
          }
        }
      );
      this.ctor.flags = Object.fromEntries(flagArray);
    }
  }

  public async init(): Promise<void> {
    await super.init();

    const { flags: parsedFlags } = await this.parse({
      flags: this.ctor.flags,
    });

    this.flags = this.ctor.flags;
    this.parsedFlags = parsedFlags;

    if (
      tty.isatty(process.stdin.fd) &&
      process.env.DEEPGRAM_CLI_NON_INTERACTIVE !== "1" &&
      process.env.CI !== "1"
    ) {
      await this.promptFlags();
    }
  }

  protected async promptFlags() {
    const flagArray = Object.entries(this.flags);

    const filtered = flagArray.filter(
      ([key, flag]: [string, PromptableFlag<T>]) => {
        return flag.prompt === true && !(key in this.parsedFlags);
      }
    );

    const promptPromises = filtered.map(
      async ([key, flag]: [string, PromptableFlag<T>]) => {
        const value = await input({
          message: `Please enter a ${flag.summary}:`,
        });
        return [key, value];
      }
    );

    const promptPromisesFinished = await Promise.all(promptPromises);
    const promptFlags = Object.fromEntries(promptPromisesFinished);

    this.parsedFlags = { ...this.parsedFlags, ...promptFlags };
  }

  private wrapLine(string: string, indent = 0) {
    const limit = 80;
    const start = indent;
    const end = limit - start;
    const wrap = wordwrap(start, end);

    return wrap(string);
  }

  public title(string: string, logLevel = LogLevel.warn) {
    if (this.parsedFlags["log-level"] >= logLevel) {
      this.log(this.wrapLine(string));
    }
  }

  public subtitle(string: string, logLevel = LogLevel.warn) {
    if (this.parsedFlags["log-level"] >= logLevel) {
      this.log(this.wrapLine(string, 2));
    }
  }

  public output(string: string, logLevel = LogLevel.warn, indent = 2) {
    if (this.parsedFlags["log-level"] >= logLevel) {
      this.log(this.wrapLine(string, indent));
    }
  }
}
