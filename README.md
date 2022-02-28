# Deepgram CLI

![Deepgram CLI](deepgram.png)

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/@deepgram/cli.svg)](https://npmjs.org/package/@deepgram/cli)
[![CircleCI](https://circleci.com/gh/lukeocodes/deepgram-cli/tree/main.svg?style=shield)](https://circleci.com/gh/lukeocodes/deepgram-cli/tree/main)
[![Downloads/week](https://img.shields.io/npm/dw/@deepgram/cli.svg)](https://npmjs.org/package/@deepgram/cli)
[![License](https://img.shields.io/npm/l/@deepgram/cli.svg)](https://github.com/lukeocodes/deepgram-cli/blob/main/package.json)

## This project is in active development and commands are likely to change without warning or deprecation.

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
* [`deepgram generate [TEMPLATE]`](#deepgram-generate-template)
* [`deepgram help [COMMAND]`](#deepgram-help-command)
* [`deepgram keys [PROJECT]`](#deepgram-keys-project)
* [`deepgram keys create [PROJECT]`](#deepgram-keys-create-project)
* [`deepgram keys delete [PROJECT] [API_KEY_ID]`](#deepgram-keys-delete-project-api_key_id)
* [`deepgram projects`](#deepgram-projects)
* [`deepgram projects get [PROJECT]`](#deepgram-projects-get-project)
* [`deepgram setup [API_KEY]`](#deepgram-setup-api_key)
* [`deepgram transcribe-file [FILE]`](#deepgram-transcribe-file-file)
* [`deepgram usage [PROJECT]`](#deepgram-usage-project)
* [`deepgram usage fields [PROJECT]`](#deepgram-usage-fields-project)
* [`deepgram usage requests [PROJECT]`](#deepgram-usage-requests-project)
* [`deepgram usage requests get [PROJECT] [REQUEST]`](#deepgram-usage-requests-get-project-request)

## `deepgram generate [TEMPLATE]`

Generate a new project from our Deepgram templates directory. See https://github.com/deepgram-templates

```
USAGE
  $ deepgram generate [TEMPLATE]

ARGUMENTS
  TEMPLATE  Template name or repo URL

DESCRIPTION
  Generate a new project from our Deepgram templates directory. See https://github.com/deepgram-templates

EXAMPLES
  $ deepgram generate deepgram-templates/video-chat
  ? Enter a template name or a template repo URL: deepgram-templates/video-chat
  Cloning 'deepgram-templates/video-chat' to './video-chat'
  Running 'npm install' from './video-chat/deepgram.toml'
  Setup complete. You can now change into './video-chat'.
  Run 'npm start' to get up and running.

  $ deepgram generate
  Cloning 'deepgram-templates/video-chat' to './video-chat'
  Running 'npm install' from './video-chat/deepgram.toml'
  Setup complete. You can now change into './video-chat'.
  Run 'npm start' to get up and running.
```

_See code: [dist/commands/generate/index.ts](https://github.com/lukeocodes/deepgram-cli/blob/v0.0.0/dist/commands/generate/index.ts)_

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

## `deepgram keys [PROJECT]`

Retrieve all API keys for a given project

```
USAGE
  $ deepgram keys [PROJECT]

ARGUMENTS
  PROJECT  Project ID

DESCRIPTION
  Retrieve all API keys for a given project
```

_See code: [dist/commands/keys/index.ts](https://github.com/lukeocodes/deepgram-cli/blob/v0.0.0/dist/commands/keys/index.ts)_

## `deepgram keys create [PROJECT]`

Create an API key for a project

```
USAGE
  $ deepgram keys create [PROJECT]

ARGUMENTS
  PROJECT  Project ID

DESCRIPTION
  Create an API key for a project
```

## `deepgram keys delete [PROJECT] [API_KEY_ID]`

Delete an API key from a project

```
USAGE
  $ deepgram keys delete [PROJECT] [API_KEY_ID]

ARGUMENTS
  PROJECT     Project ID
  API_KEY_ID  API key ID

DESCRIPTION
  Delete an API key from a project
```

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

## `deepgram transcribe-file [FILE]`

Transcribe a file.

```
USAGE
  $ deepgram transcribe-file [FILE] [-o <value>] [--webvtt | --srt] [--raw]

ARGUMENTS
  FILE  File name or path

FLAGS
  -o, --output=<value>
  --raw
  --srt
  --webvtt

DESCRIPTION
  Transcribe a file.

EXAMPLES
  $ deepgram transcribe-file test.mp3 --output=test.txt
  File transcription saved to 'text.txt'
  Transcription of 'test.mp3' successful.
```

_See code: [dist/commands/transcribe-file/index.ts](https://github.com/lukeocodes/deepgram-cli/blob/v0.0.0/dist/commands/transcribe-file/index.ts)_

## `deepgram usage [PROJECT]`

Retrieves aggregated usage data for a project

```
USAGE
  $ deepgram usage [PROJECT]

ARGUMENTS
  PROJECT  Project ID

DESCRIPTION
  Retrieves aggregated usage data for a project
```

_See code: [dist/commands/usage/index.ts](https://github.com/lukeocodes/deepgram-cli/blob/v0.0.0/dist/commands/usage/index.ts)_

## `deepgram usage fields [PROJECT]`

List features used by the provided project

```
USAGE
  $ deepgram usage fields [PROJECT]

ARGUMENTS
  PROJECT  Project ID

DESCRIPTION
  List features used by the provided project
```

## `deepgram usage requests [PROJECT]`

Retrieves transcription requests for a project

```
USAGE
  $ deepgram usage requests [PROJECT] [--page <value>] [--raw | --json] [-l <value>]

ARGUMENTS
  PROJECT  Project ID

FLAGS
  -l, --limit=<value>  [default: 10]
  --json
  --page=<value>
  --raw

DESCRIPTION
  Retrieves transcription requests for a project
```

## `deepgram usage requests get [PROJECT] [REQUEST]`

Retrieves a specific transcription request for a project

```
USAGE
  $ deepgram usage requests get [PROJECT] [REQUEST]

ARGUMENTS
  PROJECT  Project ID
  REQUEST  Request ID

DESCRIPTION
  Retrieves a specific transcription request for a project
```
<!-- commandsstop -->

# Writing Templates

The Deepgram CLI can **_generate_** from any public repository, with a small amount of configuration in a `deepgram.toml`.

```toml
# command properties
[build]
  command = "your build command" # required
  args = ["--arg=one", "--arg=two"]

# config properties
[config]
  sample = "sample-config-file" # required
  output = "config-file" # required

# post-build properties
[post-build]
  message = "final message to output to instruct users to start your app"
```

Check out this [`deepgram.toml`](https://github.com/deepgram-templates/video-chat/blob/main/deepgram.toml) from our video-chat template.

```toml
[build]
  command = "npm install"

[config]
  sample = ".env-sample"
  output = ".env"

[post-build]
  message = "Run `npm start` to get up and running."
```

Config is generated by replacing template-strings in the [sample config](https://github.com/deepgram-templates/video-chat/blob/main/.env-sample), whether it's an **_API Key_** or a **_Project ID_**

In this sample, we'll replace `%api_key%` with the API configured when you set up the CLI.

```env
port=3000
deepgram_api_key=%api_key%
```

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
