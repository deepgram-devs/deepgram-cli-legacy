import { Command } from "../../types/Manifest";
import Groups from "./Groups";

type Props = {
  command: Command;
};

const Table = ({ command }: Props) => {
  return <Groups command={command} />;
};

export default Table;
