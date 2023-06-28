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
@deepgram/cli/0.3.0-beta.0 darwin-x64 node-v16.13.0
$ deepgram --help [COMMAND]
USAGE
  $ deepgram COMMAND
...
```

<!-- usagestop -->

# Commands

<!-- commands -->

- [`deepgram help [COMMANDS]`](#deepgram-help-commands)
- [`deepgram setup`](#deepgram-setup)
- [`deepgram summary`](#deepgram-summary)
- [`deepgram transcribe`](#deepgram-transcribe)

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

Setup the CLI using a Deepgram API key.

```
USAGE
  $ deepgram setup [-k <value>] [-s <value>] [-t <value>]

FLAGS
  -k, --key=<value>     https://dpgr.am/api-key
  -s, --scopes=<value>  [default: member] https://dpgr.am/scopes
  -t, --ttl=<value>     [default: 86400] https://dpgr.am/ttl

DESCRIPTION
  Setup the CLI using a Deepgram API key.

FLAG DESCRIPTIONS
  -k, --key=<value>  https://dpgr.am/api-key

    An API key provided by Deepgram.

  -s, --scopes=<value>  https://dpgr.am/scopes

    Comma separated string of Deepgram API scopes.

  -t, --ttl=<value>  https://dpgr.am/ttl

    How many seconds you should remain logged in with the Deepgram CLI. Default: 86400
```

_See code: [dist/commands/setup/index.js](https://github.com/lukeocodes/deepgram-cli/blob/v0.3.0-beta.0/dist/commands/setup/index.js)_

## `deepgram summary`

Summarize any audio or video using just one command.

```
USAGE
  $ deepgram summary [--data-url <value> | --mimetype <value>] [--data-binary <value> ]

MEDIA SOURCE FLAGS
  --data-binary=<value>  https://dpgr.am/data-binary
  --data-url=<value>     https://dpgr.am/data-url
  --mimetype=<value>     Mimetype of local audio or video file

DESCRIPTION
  Summarize any audio or video using just one command.

FLAG DESCRIPTIONS
  --data-binary=<value>  https://dpgr.am/data-binary

    Filepath of local audio or video file

  --data-url=<value>  https://dpgr.am/data-url

    URL of an audio or video file
```

_See code: [dist/commands/summary/index.js](https://github.com/lukeocodes/deepgram-cli/blob/v0.3.0-beta.0/dist/commands/summary/index.js)_

## `deepgram transcribe`

Transcribe audio/video straight from the command line

```
USAGE
  $ deepgram transcribe [--data-url <value> | --mimetype <value>] [--data-binary <value> ] [--no-transcript |
    --paragraphs |  | --smart_format | [--json | [--vtt --utterances] | [--srt ]]] [--model <value>] [--version <value>]
    [--tier <value>] [--replace <value>] [--language <value>] [--punctuate] [--profanity_filter] [--redact <value>]
    [--diarize] [--multichannel] [--search <value>] [--callback <value>] [--keywords <value>] [--keyword_boost]
    [--utt_split <value>] [--detect_language] [--detect_entities] [--summarize] [--detect_topics] [--tag <value>]

DEEPGRAM FEATURES FLAGS
  --callback=<value>     https://dpgr.am/callback
  --detect_entities      https://dpgr.am/detect_entities
  --detect_language      https://dpgr.am/detect_language
  --detect_topics        https://dpgr.am/detect_topics
  --diarize              https://dpgr.am/diarize
  --keyword_boost        https://dpgr.am/keyword_boost
  --keywords=<value>...  https://dpgr.am/keywords
  --language=<value>     https://dpgr.am/language
  --model=<value>        https://dpgr.am/model
  --multichannel         https://dpgr.am/multichannel
  --paragraphs           https://dpgr.am/paragraphs
  --profanity_filter     https://dpgr.am/profanity_filter
  --punctuate            https://dpgr.am/punctuate
  --redact=<value>...    https://dpgr.am/redact
  --replace=<value>...   https://dpgr.am/replace
  --search=<value>...    https://dpgr.am/search
  --smart_format         https://dpgr.am/smart_format
  --summarize            https://dpgr.am/summarize
  --tag=<value>...       https://dpgr.am/tag
  --tier=<value>         https://dpgr.am/tier
  --utt_split=<value>    https://dpgr.am/utt_split
  --utterances           https://dpgr.am/utterances
  --version=<value>      https://dpgr.am/version

MEDIA SOURCE FLAGS
  --data-binary=<value>  https://dpgr.am/data-binary
  --data-url=<value>     https://dpgr.am/data-url
  --mimetype=<value>     Mimetype of local audio or video file

FORMATTING FLAGS
  --json           Output JSON format of the response. This comes verbatim from the API
  --no-transcript  Disable transcript so you can output understanding features
  --srt            Output SRT formatted captions. This requires utterances
  --vtt            Output WebVTT formatted captions. This requires utterances

DESCRIPTION
  Transcribe audio/video straight from the command line

FLAG DESCRIPTIONS
  --callback=<value>  https://dpgr.am/callback

    Deepgram feature: callback

  --data-binary=<value>  https://dpgr.am/data-binary

    Filepath of local audio or video file

  --data-url=<value>  https://dpgr.am/data-url

    URL of an audio or video file

  --detect_entities  https://dpgr.am/detect_entities

    Deepgram feature: detect_entities

  --detect_language  https://dpgr.am/detect_language

    Deepgram feature: detect_language

  --detect_topics  https://dpgr.am/detect_topics

    Deepgram feature: detect_topics

  --diarize  https://dpgr.am/diarize

    Deepgram feature: diarize

  --keyword_boost  https://dpgr.am/keyword_boost

    Deepgram feature: keyword_boost

  --keywords=<value>...  https://dpgr.am/keywords

    Deepgram feature: keywords

  --language=<value>  https://dpgr.am/language

    Deepgram feature: language

  --model=<value>  https://dpgr.am/model

    Deepgram feature: model

  --multichannel  https://dpgr.am/multichannel

    Deepgram feature: multichannel

  --paragraphs  https://dpgr.am/paragraphs

    Deepgram feature: paragraphs

  --profanity_filter  https://dpgr.am/profanity_filter

    Deepgram feature: profanity_filter

  --punctuate  https://dpgr.am/punctuate

    Deepgram feature: punctuate

  --redact=<value>...  https://dpgr.am/redact

    Deepgram feature: redact

  --replace=<value>...  https://dpgr.am/replace

    Deepgram feature: replace

  --search=<value>...  https://dpgr.am/search

    Deepgram feature: search

  --smart_format  https://dpgr.am/smart_format

    Deepgram feature: smart_format

  --summarize  https://dpgr.am/summarize

    Deepgram feature: summarize

  --tag=<value>...  https://dpgr.am/tag

    Deepgram feature: tag

  --tier=<value>  https://dpgr.am/tier

    Deepgram feature: tier

  --utt_split=<value>  https://dpgr.am/utt_split

    Deepgram feature: utt_split

  --utterances  https://dpgr.am/utterances

    Deepgram feature: utterances

  --version=<value>  https://dpgr.am/version

    Deepgram feature: version
```

_See code: [dist/commands/transcribe/index.js](https://github.com/lukeocodes/deepgram-cli/blob/v0.3.0-beta.0/dist/commands/transcribe/index.js)_

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
