import { FlagGroup } from "../../types/Manifest";
import Flag from "./Flag";

type Props = {
  name: string;
  group: FlagGroup;
};

const Group = ({ name, group }: Props) => {
  return (
    <>
      <h3 className="text-2xl capitalize">{name.toLowerCase()} Options</h3>
      <table className="min-w-full divide-y divide-white/40">
        <thead>
          <tr>
            <th
              scope="col"
              className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-0 w-2/12"
            >
              Flag
            </th>
            <th
              scope="col"
              className="px-3 py-3.5 text-left text-sm font-semibold text-white"
            >
              Summary
            </th>
            <th
              scope="col"
              className="px-3 py-3.5 text-left text-sm font-semibold text-white w-3/12"
            >
              Rules
            </th>
          </tr>
        </thead>
        <tbody className="divide-y  divide-white/20">
          {Object.keys(group).map((flag, idx) => (
            <Flag key={idx} name={flag} flag={Object.values(group)[idx]} />
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Group;
