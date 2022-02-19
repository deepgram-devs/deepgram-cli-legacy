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
* [`deepgram hello PERSON`](#deepgram-hello-person)
* [`deepgram hello world`](#deepgram-hello-world)
* [`deepgram help [COMMAND]`](#deepgram-help-command)
* [`deepgram plugins`](#deepgram-plugins)
* [`deepgram plugins:inspect PLUGIN...`](#deepgram-pluginsinspect-plugin)
* [`deepgram plugins:install PLUGIN...`](#deepgram-pluginsinstall-plugin)
* [`deepgram plugins:link PLUGIN`](#deepgram-pluginslink-plugin)
* [`deepgram plugins:uninstall PLUGIN...`](#deepgram-pluginsuninstall-plugin)
* [`deepgram plugins update`](#deepgram-plugins-update)

## `deepgram hello PERSON`

Say hello

```
USAGE
  $ deepgram hello [PERSON] -f <value>

ARGUMENTS
  PERSON  Person to say hello to

FLAGS
  -f, --from=<value>  (required) Whom is saying hello

DESCRIPTION
  Say hello

EXAMPLES
  $ oex hello friend --from oclif
  hello friend from oclif! (./src/commands/hello/index.ts)
```

_See code: [dist/commands/hello/index.ts](https://github.com/lukeocodes/deepgram-cli/blob/v0.0.0/dist/commands/hello/index.ts)_

## `deepgram hello world`

Say hello world

```
USAGE
  $ deepgram hello world

DESCRIPTION
  Say hello world

EXAMPLES
  $ oex hello world
  hello world! (./src/commands/hello/world.ts)
```

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

## `deepgram plugins`

List installed plugins.

```
USAGE
  $ deepgram plugins [--core]

FLAGS
  --core  Show core plugins.

DESCRIPTION
  List installed plugins.

EXAMPLES
  $ deepgram plugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v2.0.11/src/commands/plugins/index.ts)_

## `deepgram plugins:inspect PLUGIN...`

Displays installation properties of a plugin.

```
USAGE
  $ deepgram plugins:inspect PLUGIN...

ARGUMENTS
  PLUGIN  [default: .] Plugin to inspect.

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Displays installation properties of a plugin.

EXAMPLES
  $ deepgram plugins:inspect myplugin
```

## `deepgram plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ deepgram plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.

  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.

ALIASES
  $ deepgram plugins add

EXAMPLES
  $ deepgram plugins:install myplugin 

  $ deepgram plugins:install https://github.com/someuser/someplugin

  $ deepgram plugins:install someuser/someplugin
```

## `deepgram plugins:link PLUGIN`

Links a plugin into the CLI for development.

```
USAGE
  $ deepgram plugins:link PLUGIN

ARGUMENTS
  PATH  [default: .] path to plugin

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Links a plugin into the CLI for development.

  Installation of a linked plugin will override a user-installed or core plugin.

  e.g. If you have a user-installed or core plugin that has a 'hello' command, installing a linked plugin with a 'hello'
  command will override the user-installed or core plugin implementation. This is useful for development work.

EXAMPLES
  $ deepgram plugins:link myplugin
```

## `deepgram plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ deepgram plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ deepgram plugins unlink
  $ deepgram plugins remove
```

## `deepgram plugins update`

Update installed plugins.

```
USAGE
  $ deepgram plugins update [-h] [-v]

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Update installed plugins.
```
<!-- commandsstop -->
