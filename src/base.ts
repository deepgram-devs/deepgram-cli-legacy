import { Command, Flags } from "@oclif/core";
import wordwrap from "wordwrap";

export abstract class BaseCommand<T extends typeof Command> extends Command {
  static baseFlags = {
    key: Flags.string({
      char: "k",
      name: "apiKey",
      env: "DEEPGRAM_API_KEY",
      required: false,
      description:
        "The `DEEPGRAM_API_KEY` environment variable (or --key flag) can be supplied instead of running `deepgram setup` to configure the CLI.",
    }),
  };

  private wrapLine(string: string, indent = 0) {
    const limit = 80;
    const start = indent;
    const end = limit - start;
    const wrap = wordwrap(start, end);

    return wrap(string);
  }

  private indentLine(string: string, indent = 0) {
    const limit = 999999;
    const start = indent;
    const end = limit - start;
    const wrap = wordwrap(start, end);

    return wrap(string);
  }

  public output(string: string, indent = 2, noWrap = false) {
    if (noWrap) {
      this.log(this.indentLine(string, indent));
    } else {
      this.log(this.wrapLine(string, indent));
    }
  }
}
