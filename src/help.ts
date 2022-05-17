import { Help } from "@oclif/core";
// import asciify from "asciify-image";
import { logo } from "./logo";

export default class CliHelp extends Help {
  formatRoot() {
    return [this.header(), this.version(), this.usage()].join("\n\n");
  }

  header() {
    return ["", logo, "           The Deepgram CLI"].join("\n\n");
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
