oclif-hello-world
=================

oclif example Hello World CLI

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/oclif-hello-world.svg)](https://npmjs.org/package/oclif-hello-world)
[![CircleCI](https://circleci.com/gh/oclif/hello-world/tree/main.svg?style=shield)](https://circleci.com/gh/oclif/hello-world/tree/main)
[![Downloads/week](https://img.shields.io/npm/dw/oclif-hello-world.svg)](https://npmjs.org/package/oclif-hello-world)
[![License](https://img.shields.io/npm/l/oclif-hello-world.svg)](https://github.com/oclif/hello-world/blob/main/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
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

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v5.1.10/src/commands/help.ts)_

## `deepgram projects`

Retrieve all projects your API key has access to manage.

```
USAGE
  $ deepgram projects

DESCRIPTION
  Retrieve all projects your API key has access to manage.

EXAMPLES
  $ deepgram projects
  e.g. output! (./src/commands/projects/index.ts)
```

_See code: [dist/commands/projects/index.ts](https://github.com/lukeocodes/deepgram-cli/blob/v0.0.0/dist/commands/projects/index.ts)_
<!-- commandsstop -->
