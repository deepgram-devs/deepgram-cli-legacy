"use client";

import { useEffect, useState } from "react";
import { ThemeProvider } from "next-themes";
import Brand from "@/app/components/Brand";
import Section from "@/app/components/layout/Section";
import Margin from "@/app/components/layout/Margin";
import TerminalWindow from "@/app/components/layout/TerminalWindow";
import Header from "@/app/components/layout/Header";
import CommandLine from "@/app/components/CommandLine";
import LightModeToggle from "@/app/components/LightModeToggle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import {
  faPepperHot,
  faArrowLeftLong,
} from "@fortawesome/free-solid-svg-icons";
import { group } from "group-items";

import type { Command, Data } from "@/app/types/Manifest";
import Link from "next/link";
import Heading from "@/app/components/commands/Heading";
import Groups from "@/app/components/commands/Groups";
import Table from "../components/commands/Table";

async function getData() {
  const res = await import("@/../oclif.manifest.json");

  return res;
}

type Props = {
  params: { slug: string };
};

export default function Home({ params: { slug } }: Props) {
  const [version, setVersion] = useState<string | undefined>();
  const [command, setCommand] = useState<string | undefined>();
  const [data, setData] = useState<Command | undefined>();

  useEffect(() => {
    getData().then((result) => {
      const defaultData: Data = { ...result.default };

      if (slug in defaultData.commands) {
        let thisCommand: Command = defaultData.commands[slug];

        let groups = Object.fromEntries(
          group(Object.entries(thisCommand.flags))
            .by(([flag, obj]) => obj.helpGroup)
            .asEntries()
            .map(({ key, items }) => {
              return [key ?? "GENERAL", Object.fromEntries(items)];
            })
        );

        thisCommand.groupedFlags = groups;
        setData(thisCommand);
        setCommand(slug);
        setVersion(defaultData.version);
      }
    });
  }, [data, slug]);

  return (
    <ThemeProvider attribute="class">
      <main className="flex min-h-screen w-full flex-col">
        <Header>
          <Brand />
          <div className="flex justify-end gap-x-4 items-center">
            <a
              href="https://deepgram.com?utm_source=cli&utm_campaign=cli&utm_medium=cli"
              target="_blank"
              className="text-black dark:text-white mr-4 font-semibold"
            >
              deepgram.com
            </a>
            <a
              className="button button--secondary"
              href="https://github.com/deepgram-devs/deepgram-cli?utm_source=cli&utm_campaign=cli&utm_medium=cli"
              target="_blank"
            >
              <span>
                <FontAwesomeIcon icon={faGithub} className="mr-2" />
                See the code
              </span>
            </a>
            <a
              className="button"
              href="https://dpgr.am/api-key"
              target="_blank"
            >
              <span>
                <FontAwesomeIcon icon={faPepperHot} className="mr-2" />
                Free API Key
              </span>
            </a>
            <LightModeToggle />
          </div>
        </Header>
        <Section className="gradient-bg bg-cover bg-no-repeat py-20 bg-[top_right_200%] pb-[40%] -mb-[40%]">
          <Margin className="flex-col p-6">
            <Link
              href={`/`}
              className="inline-block gradient-text  font-semibold"
            >
              <FontAwesomeIcon
                icon={faArrowLeftLong}
                className="w-4 text-white mr-3"
              />
              Go Back
            </Link>
          </Margin>
        </Section>
        <Section className="m-0 p-0">
          <Margin className="flex-col p-6">
            <h1 className="text-5xl block h-[1.5em] min-h-[1.5em] mt-2 capitalize">
              {command}{" "}
              <small className="text-sm lowercase">
                <code>@deepgram/cli{data ? `@${version}` : null}</code>
              </small>
            </h1>
            <h2 className="text-xl text-gray-400 mb-4 capitalize">
              {data?.description}
            </h2>
            <div className="max-w-screen-lg w-full mx-auto">
              <TerminalWindow className="max-h-[5em]">
                <CommandLine>deepgram {command}</CommandLine>
              </TerminalWindow>
            </div>
          </Margin>
        </Section>
        {data && command && (
          <Section>
            <Margin className="flex-col p-6 gap-6">
              <h3 className="text-xl text-gray-400">
                Full list of commands for the command command.
              </h3>
              <Table command={data} />
            </Margin>
          </Section>
        )}
      </main>
    </ThemeProvider>
  );
}
