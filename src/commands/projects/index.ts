import SecureCommand from "../../secure";

const tablize = require("jsontostringtable");

export default class ListProjects extends SecureCommand {
  static description =
    "Retrieve all Deepgram Projects your API key has access to.";

  async run(): Promise<void> {
    const { projects } = await this.deepgram.projects
      .list()
      .catch((err) => this.error(err));

    this.log(tablize(projects));
  }
}
