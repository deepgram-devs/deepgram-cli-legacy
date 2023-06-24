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
  $ deepgram setup [--log-level 0|1|2|3|debug|info|warn|error] [-k <value>] [-s <value>] [-t <value>]

FLAGS
  -k, --key=<value>     Deepgram API key
  -s, --scopes=<value>  Deepgram auth scopes
  -t, --ttl=<value>     [default: 86400] Seconds to remain logged in

GLOBAL FLAGS
  --log-level=<option>  [default: 1] Specify level for logging.
                        <options: 0|1|2|3|debug|info|warn|error>

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

## `deepgram transcribe`

Transcribe audio/video straight from the command line.

```
USAGE
  $ deepgram transcribe [--log-level 0|1|2|3|debug|info|warn|error] [--data-url <value> | --mimetype <value>]
    [--data-binary <value> ] [--json | [--vtt --utterances] | [--srt ]] [--no-transcript | --paragraphs |  |
    --smart_format] [--model <value>] [--version <value>] [--tier <value>] [--replace <value>] [--language <value>]
    [--punctuate] [--profanity_filter] [--redact <value>] [--diarize] [--diarize_version <value>] [--multichannel]
    [--alternatives <value>] [--numbers] [--numerals] [--numbers_spaces] [--search <value>] [--callback <value>]
    [--keywords <value>] [--keyword_boost <value>] [--utt_split <value>] [--detect_language] [--detect_entities]
    [--summarize] [--translate <value>] [--detect_topics] [--sentiment] [--analyze_sentiment] [--sentiment_threshold
    <value>] [--dates] [--date_format <value>] [--times] [--dictation] [--measurements] [--tag <value>] [--ner]

FLAGS
  --alternatives=<value>         Deepgram feature: alternatives
  --analyze_sentiment            Deepgram feature: analyze_sentiment
  --callback=<value>             Deepgram feature: callback
  --data-binary=<value>          filepath
  --data-url=<value>             url
  --date_format=<value>          Deepgram feature: date_format
  --dates                        Deepgram feature: dates
  --detect_entities              Deepgram feature: detect_entities
  --detect_language              Deepgram feature: detect_language
  --detect_topics                Deepgram feature: detect_topics
  --diarize                      Deepgram feature: diarize
  --diarize_version=<value>      Deepgram feature: diarize_version
  --dictation                    Deepgram feature: dictation
  --json                         json
  --keyword_boost=<value>        Deepgram feature: keyword_boost
  --keywords=<value>...          Deepgram feature: keywords
  --language=<value>             Deepgram feature: language
  --measurements                 Deepgram feature: measurements
  --mimetype=<value>             mimetype
  --model=<value>                Deepgram feature: model
  --multichannel                 Deepgram feature: multichannel
  --ner                          Deepgram feature: ner
  --no-transcript                No transcript
  --numbers                      Deepgram feature: numbers
  --numbers_spaces               Deepgram feature: numbers_spaces
  --numerals                     Deepgram feature: numerals
  --paragraphs                   Deepgram feature: paragraphs
  --profanity_filter             Deepgram feature: profanity_filter
  --punctuate                    Deepgram feature: punctuate
  --redact=<value>...            Deepgram feature: redact
  --replace=<value>...           Deepgram feature: replace
  --search=<value>...            Deepgram feature: search
  --sentiment                    Deepgram feature: sentiment
  --sentiment_threshold=<value>  Deepgram feature: sentiment_threshold
  --smart_format                 Deepgram feature: smart_format
  --srt                          srt
  --summarize                    Deepgram feature: summarize
  --tag=<value>...               Deepgram feature: tag
  --tier=<value>                 Deepgram feature: tier
  --times                        Deepgram feature: times
  --translate=<value>...         Deepgram feature: translate
  --utt_split=<value>            Deepgram feature: utt_split
  --utterances                   Deepgram feature: utterances
  --version=<value>              Deepgram feature: version
  --vtt                          vtt

GLOBAL FLAGS
  --log-level=<option>  [default: 1] Specify level for logging.
                        <options: 0|1|2|3|debug|info|warn|error>

DESCRIPTION
  Transcribe audio/video straight from the command line.

FLAG DESCRIPTIONS
  --data-binary=<value>  filepath

    filepath

  --data-url=<value>  url

    url

  --json  json

    json

  --mimetype=<value>  mimetype

    mimetype

  --no-transcript  No transcript

    Don't output a transcript

  --srt  srt

    srt

  --vtt  vtt

    vtt
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
