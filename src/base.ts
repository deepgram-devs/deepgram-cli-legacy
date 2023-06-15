import { Command, Config } from "@oclif/core";
import { FlagInput, CompletableFlag } from "@oclif/core/lib/interfaces/parser";
import { input } from "@inquirer/prompts";
import tty from "tty";

type PromptableFlag<T> = CompletableFlag<T> & {
  prompt?: boolean;
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

  // protected async catch(err: Error & { exitCode?: number }): Promise<any> {
  //   // add any custom logic to handle errors from the command
  //   // or simply return the parent class error handling
  //   return super.catch(err);
  // }

  // protected async finally(_: Error | undefined): Promise<any> {
  //   // called after run and catch regardless of whether or not the command errored
  //   return super.finally(_);
  // }

  public async run(): Promise<void> {
    console.log(this.parsedFlags);
  }
}
