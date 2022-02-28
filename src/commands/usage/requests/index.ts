import { Flags } from "@oclif/core";
import AuthGuard from "../../guard";
import inquirer from "inquirer";
import { validateProjectID } from "../../validator/projectId";
import { EOL } from "os";
import { UsageRequestList } from "@deepgram/sdk/dist/types";

const tablize = require("jsontostringtable");

export default class Requests extends AuthGuard {
  static prompts = [
    {
      type: "input",
      name: "project",
      message: "Please enter a Project ID:",
      validate: validateProjectID,
    },
  ];

  static args = [
    {
      name: "project",
      required: false,
      description: "Project ID",
    },
  ];

  static flags = {
    page: Flags.integer({ default: 0 }),
    raw: Flags.boolean({ exclusive: ["json"] }),
    json: Flags.boolean({ exclusive: ["raw"] }),
    limit: Flags.integer({ char: "l", required: false, default: 10 }),
  };

  static description = "Retrieves transcription requests for a project";

  static examples = [];

  public async run(): Promise<void> {
    let { args, flags } = await this.parse(Requests);
    args = await inquirer.prompt(Requests.prompts, args);

    let lastOutput: string = "";
    const lastOutputLength = (): number => {
      return lastOutput.split(EOL).length - 1;
    };

    const rawResultsPage = async (
      page: number = 0
    ): Promise<UsageRequestList> => {
      return await this.deepgram.usage.listRequests(args.project, {
        page,
        limit: flags.limit,
      });
    };

    const resultsPage = async (
      page: number
    ): Promise<{ current: number; length?: number }> => {
      const { requests, page: current } =
        await this.deepgram.usage.listRequests(args.project, {
          page,
          limit: flags.limit,
        });

      return { current: current, length: requests?.length };
    };

    const getNextPage = async (page: number) => {
      const thisPage = await rawResultsPage(page);
      const length = thisPage.requests?.length;
      const current = thisPage.page;

      lastOutput = tablize(thisPage.requests);
      process.stdout.write(lastOutput);

      const nav: string[] = [];

      // if the amount of results was the limit, assume there could be a 'next' page
      const hasNext = length == flags.limit;
      if (hasNext) {
        nav.push("Next");
      }

      // if the current page > 1 then there is a 'prev' page
      const hasPrev = current > 0;
      if (hasPrev) {
        nav.push("Previous");
      }

      // if we're going to prompt, offer a cancel
      if (hasPrev || hasNext) {
        nav.push("Cancel");
      }

      if (nav.length !== 0) {
        const answers = await inquirer.prompt([
          { type: "list", name: "nav", message: "What now?", choices: nav },
        ]);

        if (answers.nav !== "Cancel") {
          if (lastOutput !== "") {
            process.stdout.moveCursor(0, (lastOutputLength() + 1) * -1, () => {
              process.stdout.clearScreenDown();
            });
          }

          await getNextPage(answers.nav === "Next" ? current + 1 : current - 1);
        }
      }
    };

    if (!flags.raw && !flags.json) {
      await getNextPage(0);
    } else {
      const results = await rawResultsPage(flags.page);

      if (flags.raw) {
        this.log(tablize(results.requests));
      } else if (flags.json) {
        this.log(JSON.stringify(results, null, 2));
      }
    }
  }
}
