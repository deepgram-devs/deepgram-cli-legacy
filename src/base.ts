import { Command, Config, Flags } from "@oclif/core";
/* eslint-disable @typescript-eslint/no-unused-vars */
import password from "@inquirer/password";
import { input } from "@inquirer/prompts";
/* eslint-enable @typescript-eslint/no-unused-vars */
import tty from "tty";
import wordwrap from "wordwrap";

import type {
  FlagInput,
  CompletableFlag,
} from "@oclif/core/lib/interfaces/parser";

type PromptableFlag<T> = CompletableFlag<T> & {
  prompt?: boolean;
  inquirer?: string;
};

const promptMap = (type: string, message: string) => {
  switch (type) {
    case "password": {
      return password({ message });
    }
    default: {
      return input({ message });
    }
  }
};

export abstract class BaseCommand<T extends typeof Command> extends Command {
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
        const type: string = flag.inquirer ?? "input";
        const value = await promptMap(type, `Please enter a ${flag.summary}:`);
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

  public title(string: string) {
    this.log(this.wrapLine(string));
  }

  public subtitle(string: string) {
    this.log(this.wrapLine(string, 2));
  }

  public output(string: string, indent = 2) {
    this.log(this.wrapLine(string, indent));
  }
}
