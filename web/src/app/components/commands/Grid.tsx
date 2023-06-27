import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTerminal } from "@fortawesome/free-solid-svg-icons";

import type { Command } from "@/app/types/Manifest";

type Props = {
  commands: { [x: string]: Command };
};

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

const Grid = ({ commands }: Props) => {
  if (!commands) return <>Loading...</>;

  return (
    <div className="bg-black/5 border-white/10 border overflow-hidden rounded-lg shadow sm:grid sm:grid-cols-2 sm:gap-px">
      {Object.keys(commands).map((command, commandIdx, arr) => (
        <>
          <div
            key={command}
            className={classNames(
              commandIdx === 0
                ? "rounded-tl-lg rounded-tr-lg sm:rounded-tr-none"
                : "",
              commandIdx === 1 ? "sm:rounded-tr-lg rounded-bl-none" : "",
              commandIdx === arr.length - 2 && commandIdx !== 1
                ? "sm:rounded-bl-lg "
                : "",
              commandIdx === arr.length - 1 ? " sm:rounded-bl-none" : "",
              commandIdx % 2 === 0 ? "rounded-br-none" : "",
              "group bg-white/20 relative p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500"
            )}
          >
            <div>
              <span className="bg-white/20 inline-flex rounded-lg p-3 ring-4 ring-white">
                <FontAwesomeIcon icon={faTerminal} />
              </span>
            </div>
            <div className="mt-8">
              <h3 className="text-base font-semibold leading-6 capitalize">
                <Link href={`/${command}`} className="focus:outline-none">
                  {/* Extend touch target to entire panel */}
                  <span className="absolute inset-0" aria-hidden="true" />
                  {command}
                </Link>
              </h3>
              <p className="mt-2 text-sm text-gray-400">
                {commands[command].description}
              </p>
            </div>
            <span
              className="pointer-events-none absolute right-6 top-6 text-gray-300 group-hover:text-gray-400"
              aria-hidden="true"
            >
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
              </svg>
            </span>
          </div>
          {commandIdx === arr.length - 1 && commandIdx % 2 === 0 && (
            <>
              <div
                className={
                  "group bg-white/20 relative p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500"
                }
              ></div>
            </>
          )}
        </>
      ))}
    </div>
  );
};

export default Grid;
