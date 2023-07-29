import { Args, Flags } from "@oclif/core";
import { Octokit } from "@octokit/rest";
import { RequestError } from "@octokit/request-error";
import { select, confirm } from "@inquirer/prompts";
import SecureCommand from "../../secure";
const octokit = new Octokit();

const toTitleCase = (name: string) => {
  return name.replace(/\w\S*/g, (txt) => {
    return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase();
  });
};

const parseStarterName = (name: string) => {
  if (
    /^((prerecorded)|(live))-([a-zA-Z0-9_]*)-([a-zA-Z0-9_]*)-starter$/g.test(
      name
    )
  ) {
    const [type, language, framework] = name.split("-", 3);

    return {
      type,
      language,
      framework,
      name: toTitleCase(`${framework} ${type} starter`),
      repo: name,
    };
  }

  if (/^((prerecorded)|(live))-([a-zA-Z0-9_]*)-starter$/g.test(name)) {
    const [type, language] = name.split("-", 2);

    return {
      type,
      language,
      framework: null,
      name: toTitleCase(`${language} ${type} starter`),
      repo: name,
    };
  }

  throw new Error("enable to parse starter name");
};

const isStarterName = (name: string) => {
  return /^((prerecorded)|(live))-([a-zA-Z0-9_]*)-(([a-zA-Z0-9_]*)-)?starter$/g.test(
    name
  );
};

const isGitHubUrl = (url: string) => {
  return /^(http(s)?):\/\/(www\.)?github\.[a-z]{2,6}\/([a-zA-Z0-9_-]*)\/([\.a-zA-Z0-9_-]*)\/?$/g.test(
    url
  );
};

const urlToAtom = (url: string) => {
  return url
    .replace(/^(http(s)?):\/\/(www\.)?github\.[a-z]{2,6}\//gi, "")
    .replace(/\/$/gi, "");
};

const isGitHubAtom = (url: string) => {
  return /^([a-zA-Z0-9_-]*)\/([\.a-zA-Z0-9_-]*)$/gi.test(url);
};

export default class Starter extends SecureCommand {
  static args = {
    repository: Args.string({
      name: "repository",
      required: false,
      description: "Repository to create a starter from",
    }),
  };

  static flags = {
    select: Flags.boolean({
      name: "select",
      required: false,
      description: "Select from the Starter library",
    }),
  };

  static description = "Generate a Deepgram starter app.";

  /**
   * Takes a URL or a user/repo format and checks if it's set up as a Deepgram starter project
   * @param {string} repository Takes a URL or a string as user/repo format
   * @returns {object | Error}
   */
  private async getStarterFromRepository(repository: string): Promise<
    | {
        owner: string;
        repo: string;
      }
    | Error
  > {
    let atom = repository;

    if (isGitHubUrl(repository)) {
      atom = urlToAtom(repository);
    }

    if (repository && !isGitHubAtom(atom)) {
      console.log("Parsing error has occured");
    }

    const [owner, repo] = atom.split("/", 2);

    try {
      await octokit.rest.repos.getContent({
        owner,
        repo,
        path: "deepgram.toml",
      });
    } catch (error) {
      if (error instanceof RequestError) {
        if (error.status === 404) {
          return new Error("Project doesn't have a `deepgram.toml` file.");
        } else throw error;
      }
    }

    return { owner, repo };
  }

  private async selectStarter(): Promise<
    | {
        owner: string;
        repo: string;
      }
    | Error
  > {
    const DEEPGRAM_STARTER_ORG = "deepgram-starters";
    const { data } = await octokit.rest.repos.listForOrg({
      org: DEEPGRAM_STARTER_ORG,
    });

    const allStarters = data
      .filter((r) => isStarterName(r.name))
      .map((r) => parseStarterName(r.name));

    const types = allStarters.map((s) => s.type);

    const type = await select({
      message: "What type of starter app are you looking for?",
      choices: types.map((s) => ({
        value: s,
      })),
    });

    const languages = allStarters
      .filter((s) => s.type === type)
      .map((s) => s.language);

    const language = await select({
      message: "What language would you prefer?",
      choices: languages.map((s) => ({
        value: s,
      })),
    });

    const starters = allStarters.filter(
      (s) => s.type === type && s.language === language
    );

    const starter = await select({
      message: "Please choose one of the following starters to set up.",
      choices: starters.map((s) => ({
        name: s.name,
        value: s.repo,
      })),
    });

    return {
      owner: DEEPGRAM_STARTER_ORG,
      repo: starter,
    };
  }

  public async run(): Promise<void> {
    const { repository } = this.parsedArgs;
    const { select } = this.parsedFlags;

    if (select && repository) {
      return console.error("A starter can't be used with --select");
    } else if (!select && !repository) {
      return console.error(
        "A starter must be provided unless --select is used"
      );
    }

    let starter;

    try {
      if (select) {
        starter = await this.selectStarter();
      } else if (repository) {
        starter = await this.getStarterFromRepository(repository);
      }

      console.log(starter);
    } catch (error: any) {
      if (error?.message) {
        console.error(error.message);
      } else throw error;
    }
  }
}
