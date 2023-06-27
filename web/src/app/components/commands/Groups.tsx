import { Command } from "../../types/Manifest";
import Group from "./Group";

type Props = {
  command: Command;
};

const Groups = ({ command }: Props) => {
  const { groupedFlags } = command;

  return (
    <>
      {groupedFlags &&
        Object.keys(groupedFlags).map((group, idx) => (
          <Group
            key={idx}
            name={group}
            group={Object.values(groupedFlags)[idx]}
          />
        ))}
    </>
  );
};

export default Groups;
