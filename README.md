# Deepgram CLI

![Deepgram CLI](deepgram.png)

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/@deepgram/cli.svg)](https://npmjs.org/package/@deepgram/cli)
[![CircleCI](https://circleci.com/gh/lukeocodes/deepgram-cli/tree/main.svg?style=shield)](https://circleci.com/gh/lukeocodes/deepgram-cli/tree/main)
[![Downloads/week](https://img.shields.io/npm/dw/@deepgram/cli.svg)](https://npmjs.org/package/@deepgram/cli)
[![License](https://img.shields.io/npm/l/@deepgram/cli.svg)](https://github.com/lukeocodes/deepgram-cli/blob/main/package.json)

 Official CLI for [Deepgram](https://www.deepgram.com/). Start building with our powerful transcription & speech understanding API.

> This project is currently ALPHA and is in active development. Commands are likely to change without warning or deprecation.
## Getting an API Key

🔑 To access the Deepgram API you will need a [free Deepgram API Key](https://console.deepgram.com/signup?jump=keys).

## Documentation

 The Deepgram CLI can be used to interact with the [Deepgram API](https://developers.deepgram.com/api-reference/) from the command line. It is built using [oclif](https://oclif.io/).

# Installation & Usage

1. Clone this repository.


```shell
$ git clone git@github.com:deepgram-devs/deepgram-cli.git
```

1. Switch to the CLI directory.
```shell
$ cd deepgram-cli
```

1. Run Yarn install to install all dependencies.
```shell
$ yarn install
```

1. Access the /bin directory.

```shell
$ cd bin
```

Run the CLI.
```shell
$ ./dev {command}
```

<!-- usage -->
```sh-session
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
* [Deepgram CLI](#deepgram-cli)
  * [Getting an API Key](#getting-an-api-key)
  * [Documentation](#documentation)
* [Installation \& Usage](#installation--usage)
* [Commands](#commands)
  * [`deepgram generate [TEMPLATE]`](#deepgram-generate-template)
  * [`deepgram help [COMMAND]`](#deepgram-help-command)
  * [`deepgram keys [PROJECT]`](#deepgram-keys-project)
  * [`deepgram keys create [PROJECT]`](#deepgram-keys-create-project)
  * [`deepgram keys delete [API_KEY_ID] [PROJECT]`](#deepgram-keys-delete-api_key_id-project)
  * [`deepgram projects`](#deepgram-projects)
  * [`deepgram projects get [PROJECT]`](#deepgram-projects-get-project)
  * [`deepgram setup [API_KEY] [PROJECT]`](#deepgram-setup-api_key-project)
  * [`deepgram switch [PROJECT]`](#deepgram-switch-project)
  * [`deepgram transcribe-file [FILE]`](#deepgram-transcribe-file-file)
  * [`deepgram usage [PROJECT]`](#deepgram-usage-project)
  * [`deepgram usage fields [PROJECT]`](#deepgram-usage-fields-project)
  * [`deepgram usage requests [PROJECT]`](#deepgram-usage-requests-project)
  * [`deepgram usage requests get [REQUEST] [PROJECT]`](#deepgram-usage-requests-get-request-project)
* [Writing Templates](#writing-templates)
* [Developing](#developing)
* [Contributing](#contributing)
  * [Getting Help](#getting-help)

## `deepgram generate [TEMPLATE]`

Generate a new project from our Deepgram templates directory. See https://github.com/deepgram-templates

```
USAGE
  $ deepgram generate [TEMPLATE]

ARGUMENTS
  TEMPLATE  Template name or repo URL

DESCRIPTION
  Generate a new project from our Deepgram templates directory. See https://github.com/deepgram-templates
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

Retrieve all API keys for a given Deepgram Project.

```
USAGE
  $ deepgram keys [PROJECT]

ARGUMENTS
  PROJECT  Project ID

DESCRIPTION
  Retrieve all API keys for a given Deepgram Project.
```

_See code: [dist/commands/keys/index.ts](https://github.com/lukeocodes/deepgram-cli/blob/v0.0.0/dist/commands/keys/index.ts)_

## `deepgram keys create [PROJECT]`

Create an API key for a Deepgram Project.

```
USAGE
  $ deepgram keys create [PROJECT]

ARGUMENTS
  PROJECT  Project ID

DESCRIPTION
  Create an API key for a Deepgram Project.
```

## `deepgram keys delete [API_KEY_ID] [PROJECT]`

Delete an API key from a Deepgram Project.

```
USAGE
  $ deepgram keys delete [API_KEY_ID] [PROJECT]

ARGUMENTS
  API_KEY_ID  API key ID
  PROJECT     Project ID

DESCRIPTION
  Delete an API key from a Deepgram Project.
```

## `deepgram projects`

Retrieve all Deepgram Projects your API key has access to.

```
USAGE
  $ deepgram projects

DESCRIPTION
  Retrieve all Deepgram Projects your API key has access to.
```

_See code: [dist/commands/projects/index.ts](https://github.com/lukeocodes/deepgram-cli/blob/v0.0.0/dist/commands/projects/index.ts)_

## `deepgram projects get [PROJECT]`

Retrieve a Deepgram Project.

```
USAGE
  $ deepgram projects get [PROJECT]

ARGUMENTS
  PROJECT  Project ID

DESCRIPTION
  Retrieve a Deepgram Project.
```

## `deepgram setup [API_KEY] [PROJECT]`

Writes the API key and Deepgram Project to a config file (can be overridden).

```
USAGE
  $ deepgram setup [API_KEY] [PROJECT]

ARGUMENTS
  API_KEY  Deepgram API Key.
  PROJECT  Deepgram Project

DESCRIPTION
  Writes the API key and Deepgram Project to a config file (can be overridden).
```

_See code: [dist/commands/setup/index.ts](https://github.com/lukeocodes/deepgram-cli/blob/v0.0.0/dist/commands/setup/index.ts)_

## `deepgram switch [PROJECT]`

Switch Deepgram Project and update the config file.

```
USAGE
  $ deepgram switch [PROJECT]

ARGUMENTS
  PROJECT  Deepgram Project

DESCRIPTION
  Switch Deepgram Project and update the config file.
```

_See code: [dist/commands/switch/index.ts](https://github.com/lukeocodes/deepgram-cli/blob/v0.0.0/dist/commands/switch/index.ts)_

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
```

_See code: [dist/commands/transcribe-file/index.ts](https://github.com/lukeocodes/deepgram-cli/blob/v0.0.0/dist/commands/transcribe-file/index.ts)_

## `deepgram usage [PROJECT]`

Retrieves aggregated usage data for a Deepgram Project.

```
USAGE
  $ deepgram usage [PROJECT]

ARGUMENTS
  PROJECT  Project ID

DESCRIPTION
  Retrieves aggregated usage data for a Deepgram Project.
```

_See code: [dist/commands/usage/index.ts](https://github.com/lukeocodes/deepgram-cli/blob/v0.0.0/dist/commands/usage/index.ts)_

## `deepgram usage fields [PROJECT]`

List features used by a Deepgram Project.

```
USAGE
  $ deepgram usage fields [PROJECT]

ARGUMENTS
  PROJECT  Project ID

DESCRIPTION
  List features used by a Deepgram Project.
```

## `deepgram usage requests [PROJECT]`

Retrieves transcription requests for a Deepgram Project.

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
  Retrieves transcription requests for a Deepgram Project.
```

## `deepgram usage requests get [REQUEST] [PROJECT]`

Retrieves a specific transcription request for a Deepgram Project.

```
USAGE
  $ deepgram usage requests get [REQUEST] [PROJECT]

ARGUMENTS
  REQUEST  Request ID
  PROJECT  Project ID

DESCRIPTION
  Retrieves a specific transcription request for a Deepgram Project.
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

# Contributing

Would you like to contribute to this project? Check out our [contributing guide](./.github/CONTRIBUTING.md).

<a href="https://github.com/lukeocodes/deepgram-cli/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=lukeocodes/deepgram-cli" />
</a>

Made with [contrib.rocks](https://contrib.rocks).

## Getting Help

We love to hear from you so if you have questions, comments or find a bug in the
project, let us know! You can either:

- [Open an issue in this repository](https://github.com/deepgram-devs/deepgram-cli/issues/new)
- [Join the Deepgram Github Discussions Community](https://github.com/orgs/deepgram/discussions)
- [Join the Deepgram Discord Community](https://discord.gg/xWRaCDBtW4)


[license]: LICENSE.txt