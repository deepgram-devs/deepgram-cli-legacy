import { Hook } from "@oclif/core";

const hook: Hook<"command_not_found"> = async function (opts) {
  process.stdout.write(`command "${opts.id}" not found\n`);
  // this.exit();
};

export default hook;
