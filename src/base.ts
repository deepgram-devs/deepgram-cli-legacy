import { Command } from "@oclif/core";

export default abstract class BaseCommand extends Command {
  public output(output: any) {
    this.log(JSON.stringify(output));
  }
}
