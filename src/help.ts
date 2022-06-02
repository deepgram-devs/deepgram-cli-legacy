import { Help } from "@oclif/core";
import chalk from "chalk";

export default class CliHelp extends Help {
  formatRoot() {
    return [this.header(), this.version(), this.usage()].join("\n\n");
  }

  header() {
    return `The ${chalk.red("Deepgram")} CLI`;
  }

  version() {
    return this.section("VERSION", this.wrap(this.config.userAgent));
  }

  usage() {
    return this.section(
      this.opts.usageHeader || "USAGE",
      this.wrap(`$ ${this.config.bin} [COMMAND]`)
    );
  }
}
