type Data = {
  version: string;
  commands: { [x: string]: Command };
};

type Command = {
  id: string;
  description: string;
  strict: boolean;
  pluginName: string;
  pluginAlias: string;
  pluginType: string;
  aliases: string[];
  flags: { [x: string]: Flag };
  args: Args;
  groupedFlags?: { [x: string]: FlagGroup };
};

type FlagGroup = {
  [x: string]: Flag;
};

type Flag = {
  name: string;
  type: string;
  char?: string;
  summary?: string;
  description?: string;
  required?: boolean;
  multiple?: boolean;
  helpGroup?: string;
  options?: string[];
  default?: number | string | boolean;
  exclusive?: string[];
  dependsOn?: string[];
};

type Args = {};

export type { Data, Command, FlagGroup, Flag, Args };
