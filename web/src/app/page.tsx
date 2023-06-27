"use client";

import { useEffect, useState } from "react";
import { ThemeProvider } from "next-themes";
import Brand from "@/app/components/Brand";
import Section from "@/app/components/layout/Section";
import Margin from "@/app/components/layout/Margin";
import TerminalWindow from "@/app/components/layout/TerminalWindow";
import Header from "@/app/components/layout/Header";
import Examples from "@/app/components/Examples";
import Hero from "@/app/components/Hero";
import CommandLine from "@/app/components/CommandLine";
import LightModeToggle from "@/app/components/LightModeToggle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faPepperHot } from "@fortawesome/free-solid-svg-icons";

import type { Data } from "@/app/types/Manifest";
import Grid from "./components/commands/Grid";

async function getData() {
  const res = await import("@/../oclif.manifest.json");

  return res;
}

export default function Home() {
  const [title, setTitle] = useState("");
  const [data, setData] = useState<Data>({ version: "0.0.x", commands: {} });

  useEffect(() => {
    getData().then((result) => {
      let defaultData: Data = { ...result.default };
      setData(defaultData);
    });
  }, []);

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
        <Hero />
        <Section className="gradient-bg bg-cover bg-no-repeat py-20 bg-[top_right_200%] pb-[30%] -mb-[30%]">
          <Margin className="flex-col p-6">
            <div className="max-w-screen-lg w-full mx-auto">
              <h3 className="text-xl text-gray-400">
                Use our command line tool to...
              </h3>
              <h2 className="text-2xl block h-[1.5em] min-h-[1.5em] my-2">
                {title}
              </h2>
              <TerminalWindow className="min-h-[25em]">
                <Examples setTitle={setTitle} />
              </TerminalWindow>
            </div>
          </Margin>
        </Section>
        {data.commands && (
          <Section>
            <Margin className="flex-col p-6 gap-6">
              <div className="max-w-screen-lg w-full mx-auto">
                <h2 className="text-2xl block h-[1.5em] min-h-[1.5em] my-2">
                  Deepgram CLI Commands{" "}
                  <small className="text-sm">
                    <code>@deepgram/cli{data ? `@${data.version}` : null}</code>
                  </small>
                </h2>
                <h3 className="text-xl text-gray-400 mb-4">
                  All the commands available in the latest version of our CLI.
                </h3>
                <Grid commands={data.commands} />
              </div>
            </Margin>
          </Section>
        )}
        <Section>
          <Margin className="flex-col p-6">
            <div className="max-w-screen-lg w-full mx-auto">
              <h3 className="text-xl text-gray-400">
                Opensource contributions are welcome!
              </h3>
              <h2 className="text-2xl block h-[1.5em] min-h-[1.5em] my-2">
                Developer mode{" "}
                <small className="text-sm">
                  <code>@deepgram/cli{data ? `@${data.version}` : null}</code>
                </small>
              </h2>
              <TerminalWindow>
                <CommandLine>
                  git clone https://github.com/deepgram-devs/deepgram-cli.git
                </CommandLine>
                <br />
                Cloning into &apos;deepgram-cli&apos;...
                <br />
                <CommandLine>cd ./deepgram-cli</CommandLine>
                <br />
                <CommandLine>npm i</CommandLine>
                <br />
                added 989 packages, and audited 991 packages in 10s
                <br />
                <CommandLine>bin/dev</CommandLine>
                <br />
                The Deepgram CLI
                <br />
                VERSION
                <br />
                {"  "}
                @deepgram/cli
                {data ? `/${data.version}` : null}
                <br />
                USAGE
                <br />
                {"  "}$ bin/dev [COMMAND]
              </TerminalWindow>
            </div>
          </Margin>
        </Section>
      </main>
    </ThemeProvider>
  );
}
