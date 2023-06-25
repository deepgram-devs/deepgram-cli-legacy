"use client";

import { useEffect, useState } from "react";
import { ThemeProvider } from "next-themes";
import Brand from "./Brand";
import {
  DefaultInstructions,
  LinuxInstructions,
  MacInstructions,
  WindowsInstructions,
} from "./instructions/index";
import Section from "./layout/Section";
import Margin from "./layout/Margin";
import TerminalWindow from "./layout/TerminalWindow";
import Header from "./layout/Header";
import Examples from "./Examples";
import Hero from "./Hero";
import CommandLine from "./CommandLine";
import Badge from "./Badge";
import Glass from "./Glass";

export default function Home() {
  const [title, setTitle] = useState("");
  const [command, setCommand] = useState("...");

  return (
    <ThemeProvider attribute="class">
      <main className="flex min-h-screen w-full flex-col gradient dark:gradient-dark">
        <Header>
          <Brand />
        </Header>
        <Hero />
        <Section>
          <Margin>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
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
              <div>
                <h3 className="text-xl text-gray-400">&nbsp;</h3>
                <h2 className="text-2xl block h-[1.5em] min-h-[1.5em] my-2">
                  Example commands
                </h2>
                <Glass className="mb-8 glass-round glass-border glass-blur glass-shadow">
                  <CommandLine>deepgram {command}</CommandLine>
                </Glass>
                <div className="flex gap-2 flex-wrap">
                  <Badge
                    onClick={() =>
                      setCommand(
                        "transcribe --data-url=https://dpgr.am/spacewalk.wav --summarize --no-transcript"
                      )
                    }
                  >
                    <CommandLine prefix={false}>
                      transcribe --summarize --no-transcript
                    </CommandLine>
                  </Badge>
                  <Badge
                    onClick={() =>
                      setCommand(
                        "transcribe --data-url=https://dpgr.am/spacewalk.wav --utterances --srt"
                      )
                    }
                  >
                    <CommandLine prefix={false}>
                      transcribe --utterances --srt
                    </CommandLine>
                  </Badge>
                  <Badge
                    onClick={() =>
                      setCommand(
                        "transcribe --data-url=https://dpgr.am/spacewalk.wav --smart_format"
                      )
                    }
                  >
                    <CommandLine prefix={false}>
                      transcribe --smart_format
                    </CommandLine>
                  </Badge>
                  <Badge
                    onClick={() =>
                      setCommand(
                        "transcribe --data-url=https://dpgr.am/spacewalk.wav --replace='search:replace' --json"
                      )
                    }
                  >
                    <CommandLine prefix={false}>
                      transcribe --replace='search:replace' --json
                    </CommandLine>
                  </Badge>
                </div>
              </div>
            </div>
          </Margin>
        </Section>
        <Section>
          <Margin>
            <h2 className="text-2xl block h-[1.5em] min-h-[1.5em] my-2">
              Transcription
            </h2>
          </Margin>
        </Section>
      </main>
    </ThemeProvider>
  );
}
