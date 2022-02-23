# Deepgram CLI

![Deepgram CLI](deepgram.png)

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/@deepgram/cli.svg)](https://npmjs.org/package/@deepgram/cli)
[![CircleCI](https://circleci.com/gh/lukeocodes/deepgram-cli/tree/main.svg?style=shield)](https://circleci.com/gh/lukeocodes/deepgram-cli/tree/main)
[![Downloads/week](https://img.shields.io/npm/dw/@deepgram/cli.svg)](https://npmjs.org/package/@deepgram/cli)
[![License](https://img.shields.io/npm/l/@deepgram/cli.svg)](https://github.com/lukeocodes/deepgram-cli/blob/main/package.json)

This is the Deepgram CLI. It is used to interact with the Deepgram API from the command line. It is built using [oclif](https://oclif.io/).

For more about Deepgram see https://www.deepgram.com.

To get started see https://console.deepgram.com.

# Issues

For problems directly related to the CLI, [add an issue on GitHub](https://github.com/lukeocodes/deepgram-cli/issues/new).

For other issues, [submit a support ticket](https://developers.deepgram.com/support/).

# Usage

<!-- usage -->
```sh-session
$ npm install -g @deepgram/cli
$ deepgram COMMAND
running command...
$ deepgram (--version)
@deepgram/cli/0.0.0 darwin-x64 node-v16.11.1
$ deepgram --help [COMMAND]
USAGE
  $ deepgram COMMAND
...
```
<!-- usagestop -->

# Commands

<!-- commands -->
* [`deepgram help [COMMAND]`](#deepgram-help-command)
* [`deepgram projects`](#deepgram-projects)
* [`deepgram projects get [PROJECT]`](#deepgram-projects-get-project)
* [`deepgram setup [API_KEY]`](#deepgram-setup-api_key)

## `deepgram help [COMMAND]`

Display help for deepgram.

```
USAGE
  $ deepgram help [COMMAND] [-n]

ARGUMENTS
  COMMAND  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for deepgram.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v5.1.11/src/commands/help.ts)_

## `deepgram projects`

Retrieve all projects your API key has access to manage.

```
USAGE
  $ deepgram projects

DESCRIPTION
  Retrieve all projects your API key has access to manage.

EXAMPLES
  $ deepgram projects
  -----------------------------------------------------------------------
  | project_id                           | name                         |
  -----------------------------------------------------------------------
  | 7a0e1c0f-4b5a-5449-97d3-d36b7ec11c68 | luke@lukeoliff.com's Project |
  | 24c4c8c2-bfb7-48fa-a1b5-709e7dq452d0 | other project                |
  -----------------------------------------------------------------------
```

_See code: [dist/commands/projects/index.ts](https://github.com/lukeocodes/deepgram-cli/blob/v0.0.0/dist/commands/projects/index.ts)_

## `deepgram projects get [PROJECT]`

Retrieve a project your API key has access to manage.

```
USAGE
  $ deepgram projects get [PROJECT]

ARGUMENTS
  PROJECT  Project ID

DESCRIPTION
  Retrieve a project your API key has access to manage.

EXAMPLES
  $ deepgram project get
  ? Please enter a Project ID 24c4c8c2-bfb7-48fa-a1b5-709e7dq452d0
  -----------------------------------------------------------------------
  | project_id                           | name                         |
  -----------------------------------------------------------------------
  | 24c4c8c2-bfb7-48fa-a1b5-709e7dq452d0 | other project                |
  -----------------------------------------------------------------------

  $ deepgram projects get 7a0e1c0f-4b5a-5449-97d3-d36b7ec11c68
  -----------------------------------------------------------------------
  | project_id                           | name                         |
  -----------------------------------------------------------------------
  | 7a0e1c0f-4b5a-5449-97d3-d36b7ec11c68 | luke@lukeoliff.com's Project |
  -----------------------------------------------------------------------
```

## `deepgram setup [API_KEY]`

Writes a config file for the API key to a default location (can be overridden).

```
USAGE
  $ deepgram setup [API_KEY]

ARGUMENTS
  API_KEY  Deepgram API Key.

DESCRIPTION
  Writes a config file for the API key to a default location (can be overridden).

EXAMPLES
  $ deepgram setup
  ? Please enter a Deepgram API Key ****************************************
  Config file created at ~/.deepgramrc

  $ deepgram setup b63ac66256616e991af56dfa2fbdc078225e63a5
  Config file created at ~/.deepgramrc
```

_See code: [dist/commands/setup/index.ts](https://github.com/lukeocodes/deepgram-cli/blob/v0.0.0/dist/commands/setup/index.ts)_
<!-- commandsstop -->

# Developing

This project can be cloned and ran locally.

```sh-session
$ yarn
$ bin/dev
$ bin/dev COMMAND
running command...
$ bin/dev (--version)
@deepgram/cli/0.0.0 darwin-x64 node-v16.11.1
$ bin/dev --help [COMMAND]
USAGE
  $ bin/dev COMMAND
```

# Contributors

Would you like to contribute to this project? Check out our [contributing guide](./.github/CONTRIBUTING.md).

<a href="https://github.com/lukeocodes/deepgram-cli/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=lukeocodes/deepgram-cli" />
</a>

Made with [contrib.rocks](https://contrib.rocks).
