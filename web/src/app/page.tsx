"use client";

import { useState } from "react";
import { ThemeProvider } from "next-themes";
import Brand from "./Brand";
import Section from "./layout/Section";
import Margin from "./layout/Margin";
import TerminalWindow from "./layout/TerminalWindow";
import Header from "./layout/Header";
import Examples from "./Examples";
import Hero from "./Hero";
import CommandLine from "./CommandLine";
import Badge from "./Badge";
import LightModeToggle from "./LightModeToggle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faPepperHot } from "@fortawesome/free-solid-svg-icons";

const features: {
  [x: string]: { name: string; type: string; multiple?: boolean }[];
} = {
  setup: [
    {
      name: "key",
      type: "string",
    },
    {
      name: "scopes",
      type: "string",
    },
    {
      name: "ttl",
      type: "string",
    },
  ],
  transcribe: [
    {
      name: "model",
      type: "string",
    },
    {
      name: "version",
      type: "string",
    },
    {
      name: "tier",
      type: "string",
    },
    {
      name: "replace",
      type: "string",
      multiple: true,
    },
    {
      name: "language",
      type: "string",
    },
    {
      name: "punctuate",
      type: "boolean",
    },
    {
      name: "profanity_filter",
      type: "boolean",
    },
    {
      name: "redact",
      type: "string",
      multiple: true,
    },
    {
      name: "diarize",
      type: "boolean",
    },
    {
      name: "multichannel",
      type: "boolean",
    },
    {
      name: "search",
      type: "string",
      multiple: true,
    },
    {
      name: "callback",
      type: "string",
    },
    {
      name: "keywords",
      type: "string",
      multiple: true,
    },
    {
      name: "keyword_boost",
      type: "boolean",
    },
    {
      name: "utterances",
      type: "boolean",
    },
    {
      name: "utt_split",
      type: "integer",
    },
    {
      name: "detect_language",
      type: "boolean",
    },
    {
      name: "paragraphs",
      type: "boolean",
    },
    {
      name: "detect_entities",
      type: "boolean",
    },
    {
      name: "summarize",
      type: "boolean",
    },
    {
      name: "detect_topics",
      type: "boolean",
    },
    {
      name: "smart_format",
      type: "boolean",
    },
    {
      name: "tag",
      type: "string",
      multiple: true,
    },
  ],
};

export default function Home() {
  const [title, setTitle] = useState("");
  const [command, setCommand] = useState("...");

  return (
    <ThemeProvider attribute="class">
      <main className="flex min-h-screen w-full flex-col gradient dark:gradient-dark">
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
        <Section>
          <Margin className="flex-col p-6">
            <div className="max-w-screen-lg w-full mx-auto">
              <h3 className="text-xl text-gray-400">
                Use our command line tool to...
              </h3>
              <h2 className="text-2xl block h-[1.5em] min-h-[1.5em] my-2">
                {title}
              </h2>
              <TerminalWindow>
                <Examples setTitle={setTitle} />
              </TerminalWindow>
            </div>
          </Margin>
        </Section>
        <Section>
          <Margin className="flex-col p-6 gap-6">
            {Object.keys(features).map((feature: string) => (
              <div>
                <h2 className="dark:text-white text-3xl block h-[1.5em] min-h-[1.5em] my-2 capitalize ">
                  {feature}{" "}
                  <small className="text-sm uppercase underline">
                    <a
                      href={`https://github.com/deepgram-devs/deepgram-cli#deepgram-${feature}`}
                      target="_blank"
                    >
                      Read more
                    </a>
                  </small>
                </h2>
                <div className="flex flex-wrap gap-3">
                  {features[feature].map((flag) => (
                    <Badge>
                      <CommandLine prefix={false}>
                        --{flag.name}
                        {flag.type === "string" ? "=<string>" : ""}
                        {flag.multiple ? "..." : ""}
                      </CommandLine>
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </Margin>
        </Section>
      </main>
    </ThemeProvider>
  );
}
