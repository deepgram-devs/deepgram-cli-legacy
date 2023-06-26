# Deepgram CLI

![Deepgram CLI](deepgram.png)

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/@deepgram/cli.svg)](https://npmjs.org/package/@deepgram/cli)
[![CircleCI](https://circleci.com/gh/lukeocodes/deepgram-cli/tree/main.svg?style=shield)](https://circleci.com/gh/lukeocodes/deepgram-cli/tree/main)
[![Downloads/week](https://img.shields.io/npm/dw/@deepgram/cli.svg)](https://npmjs.org/package/@deepgram/cli)
[![License](https://img.shields.io/npm/l/@deepgram/cli.svg)](https://github.com/lukeocodes/deepgram-cli/blob/main/package.json)

> This project is currently ALPHA and is in active development. Commands are likely to change without warning or deprecation.

This is the Deepgram CLI. It is used to interact with [Deepgram](https://developers.deepgram.com/api-reference/) from the command line. It is built using [oclif](https://oclif.io/).

- For more about Deepgram see https://www.deepgram.com.
- To get started using Deepgram [sign up](https://dpgr.am/api-key) for a free account and get 12,000 minutes free!

# Table of Contents

- [Issues](#issues)
- [Usage](#usage)
- [Commands](#commands)
  - [`deepgram help [COMMANDS]`](#deepgram-help-commands)
  - [`deepgram setup`](#deepgram-setup)
  - [`deepgram transcribe`](#deepgram-transcribe)
- [Developing](#developing)
- [Contributors](#contributors)

# Issues

- For problems directly related to the CLI, [add an issue on GitHub](https://github.com/lukeocodes/deepgram-cli/issues/new).
- For other questions using the Deepgram, post a question in our [Community Forum](https://github.com/orgs/deepgram/discussions/categories/q-a).

# Usage

<!-- usage -->
```sh-session
$ npm install -g @deepgram/cli
$ deepgram COMMAND
running command...
$ deepgram (--version)
@deepgram/cli/0.2.0 darwin-x64 node-v16.13.0
$ deepgram --help [COMMAND]
USAGE
  $ deepgram COMMAND
...
```
<!-- usagestop -->

# Commands

<!-- commands -->
* [`deepgram help [COMMANDS]`](#deepgram-help-commands)
* [`deepgram setup`](#deepgram-setup)
* [`deepgram summary`](#deepgram-summary)
* [`deepgram transcribe`](#deepgram-transcribe)

## `deepgram help [COMMANDS]`

Display help for deepgram.

```
USAGE
  $ deepgram help [COMMANDS] [-n]

ARGUMENTS
  COMMANDS  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for deepgram.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v5.2.9/src/commands/help.ts)_

## `deepgram setup`

Setup the CLI using a Deepgram API key. Read more: https://dpgr.am/cli

```
USAGE
  $ deepgram setup [-k <value>] [-s <value>] [-t <value>]

FLAGS
  -k, --key=<value>     Deepgram API key
  -s, --scopes=<value>  Deepgram auth scopes
  -t, --ttl=<value>     [default: 86400] Seconds to remain logged in

DESCRIPTION
  Setup the CLI using a Deepgram API key. Read more: https://dpgr.am/cli

FLAG DESCRIPTIONS
  -k, --key=<value>  Deepgram API key

    An API key provided by Deepgram. Get one now: https://dpgr.am/api-key

  -s, --scopes=<value>  Deepgram auth scopes

    Comma separated string of Deepgram API scopes. Read more: https://dpgr.am/scopes

  -t, --ttl=<value>  Seconds to remain logged in

    How many seconds you should remain logged in with the Deepgram CLI. Default: 86400
```

_See code: [dist/commands/setup/index.js](https://github.com/lukeocodes/deepgram-cli/blob/v0.2.0/dist/commands/setup/index.js)_

## `deepgram summary`

Summarize any audio or video using just one command.

```
USAGE
  $ deepgram summary [--data-url <value> | --mimetype <value>] [--data-binary <value> ]

MEDIA SOURCE FLAGS
  --data-binary=<value>  Filepath of local audio or video file. e.g. @~/Projects/nasa.mp4
  --data-url=<value>     URL of an audio or video file. e.g. https://dpgr.am/spacewalk.wav
  --mimetype=<value>     Mimetype of local audio or video file.

DESCRIPTION
  Summarize any audio or video using just one command.
```

_See code: [dist/commands/summary/index.js](https://github.com/lukeocodes/deepgram-cli/blob/v0.2.0/dist/commands/summary/index.js)_

## `deepgram transcribe`

Transcribe audio/video straight from the command line.

```
USAGE
  $ deepgram transcribe [--data-url <value> | --mimetype <value>] [--data-binary <value> ] [--no-transcript |
    --paragraphs |  | --smart_format | [--json | [--vtt --utterances] | [--srt ]]] [--model <value>] [--version <value>]
    [--tier <value>] [--replace <value>] [--language <value>] [--punctuate] [--profanity_filter] [--redact <value>]
    [--diarize] [--multichannel] [--search <value>] [--callback <value>] [--keywords <value>] [--keyword_boost]
    [--utt_split <value>] [--detect_language] [--detect_entities] [--summarize] [--detect_topics] [--tag <value>]

DEEPGRAM FEATURES FLAGS
  --callback=<value>     Read more: https://dpgr.am/callback
  --detect_entities      Read more: https://dpgr.am/detect_entities
  --detect_language      Read more: https://dpgr.am/detect_language
  --detect_topics        Read more: https://dpgr.am/detect_topics
  --diarize              Read more: https://dpgr.am/diarize
  --keyword_boost        Read more: https://dpgr.am/keyword_boost
  --keywords=<value>...  Read more: https://dpgr.am/keywords
  --language=<value>     Read more: https://dpgr.am/language
  --model=<value>        Read more: https://dpgr.am/model
  --multichannel         Read more: https://dpgr.am/multichannel
  --paragraphs           Read more: https://dpgr.am/paragraphs
  --profanity_filter     Read more: https://dpgr.am/profanity_filter
  --punctuate            Read more: https://dpgr.am/punctuate
  --redact=<value>...    Read more: https://dpgr.am/redact
  --replace=<value>...   Read more: https://dpgr.am/replace
  --search=<value>...    Read more: https://dpgr.am/search
  --smart_format         Read more: https://dpgr.am/smart_format
  --summarize            Read more: https://dpgr.am/summarize
  --tag=<value>...       Read more: https://dpgr.am/tag
  --tier=<value>         Read more: https://dpgr.am/tier
  --utt_split=<value>    Read more: https://dpgr.am/utt_split
  --utterances           Read more: https://dpgr.am/utterances
  --version=<value>      Read more: https://dpgr.am/version

MEDIA SOURCE FLAGS
  --data-binary=<value>  Filepath of local audio or video file. e.g. @~/Projects/nasa.mp4
  --data-url=<value>     URL of an audio or video file. e.g. https://dpgr.am/spacewalk.wav
  --mimetype=<value>     Mimetype of local audio or video file.

FORMATTING FLAGS
  --json           Output JSON format of the response. This comes verbatim from the API.
  --no-transcript  Output no transcript so you can output understanding features alone.
  --srt            Output SRT formatted captions. This requires utterances.
  --vtt            Output WebVTT formatted captions. This requires utterances.

DESCRIPTION
  Transcribe audio/video straight from the command line.
```

_See code: [dist/commands/transcribe/index.js](https://github.com/lukeocodes/deepgram-cli/blob/v0.2.0/dist/commands/transcribe/index.js)_
<!-- commandsstop -->

# Developing

1. Clone this repository.

```sh-session
$ git clone git@github.com:deepgram-devs/deepgram-cli.git
```

1. Switch to the CLI directory.

```sh-session
$ cd deepgram-cli
```

1. Install all dependencies.

```sh-session
$ npm i
```

Run the CLI.

```sh-session
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
