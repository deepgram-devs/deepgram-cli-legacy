import { Flag } from "../../types/Manifest";

type Props = {
  name: string;
  flag: Flag;
};

const Flag = ({ name, flag }: Props) => {
  return (
    <>
      <tr>
        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-white sm:pl-0">
          --{name}
          {flag.type === "option" ? "=<value>" : null}
          {flag.multiple ? "..." : null}
        </td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
          {flag.description}.{" "}
          <a
            href={flag.summary}
            className="pl-2 gradient-text font-semibold hover:text-white float-right"
            target="_blank"
          >
            Read more
          </a>
        </td>
        <td className="relative whitespace-nowrap py-4 pl-3 pr-4  text-sm font-medium sm:pr-0">
          <pre className="whitespace-break-spaces">
            {flag.type !== "e.g. boolean"
              ? flag.default
                ? `e.g. ${flag.default}`
                : 'e.g. ""'
              : "false"}
          </pre>
          {(flag.dependsOn || flag.exclusive) && (
            <>
              <br />
            </>
          )}
          {flag.dependsOn ? (
            <>
              <span className="text-zinc-500 font-semibold">Depends on:</span>{" "}
              <pre className="whitespace-break-spaces">
                {flag.dependsOn?.join(", ")}
              </pre>
            </>
          ) : null}
          {flag.dependsOn && flag.exclusive && (
            <>
              <br />
            </>
          )}
          {flag.exclusive ? (
            <>
              <span className="text-zinc-500 font-semibold">Exclusive of:</span>{" "}
              <pre className="whitespace-break-spaces">
                {flag.exclusive?.join(", ")}
              </pre>
            </>
          ) : null}
        </td>
      </tr>
    </>
  );
};

export default Flag;
