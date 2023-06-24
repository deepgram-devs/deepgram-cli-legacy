"use client";

import Typewriter from "typewriter-effect";
import { useState } from "react";

const examples = [
  {
    command: "setup --key your-key",
    output: `Config file created at '/Users/lukeoliff/.deepgramrc'`,
    title: "Setup from the command line",
  },
  {
    command:
      "transcribe --data-binary=@~/nasa.wav --mimetype=audio/wav --smart_format",
    output: `Yeah, as as it's worth celebrating the first Space walk with an all female
team. I think many of us are looking forward to it just being normal. And I
think if it signifies anything, it is to honor the women who came before us
who were skilled and qualified and didn't get the same opportunities that
we have today.
...`,
    title: "Transcribe local files or remote URLs",
  },
  {
    command: "transcribe --data-url=https://dpgr.am/spacewalk.wav --summary",
    output: `A speaker discusses the upcoming launch of an all-female Space walking
team, which is aimed at honoring skilled and qualified women who missed the
same opportunities as the first Space walk. They express excitement for the
upcoming launch and hope it will be a normal occurrence.
...`,
    title: "Summarise any video or audio",
  },
  {
    command:
      "transcribe --data-url=https://dpgr.am/spacewalk.wav --utterances --vtt",
    output: `WEBVTT

  00:00:04.509 --> 00:00:07.382
  the first space walk with an all female
  00:00:07.382 --> 00:00:07.621
  team
...`,
    title: "Output standards compliant caption formats",
  },
  {
    command: "transcribe --data-url https://dpgr.am/spacewalk.wav --json",
    output: `{
  "results": { "channels": [ { "alternatives": [
    {
      "transcript": "yeah as as it's worth celebrating the first space walk with an all female team i think many of us are looking forward to it just being normal and i think if it signifies anything it is to honor the women who came before us who were skilled and qualified and didn't get the same opportunities that we have today",
...`,
    title: "Get raw data from any commands",
  },
];

export default function Home() {
  const [title, setTitle] = useState("");
  const [output, setOutput] = useState("");

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="w-full max-w-screen-md">
        <h3 className="text-xl text-gray-400">
          Use our command line tool to...
        </h3>
        <h2 className="text-2xl block h-[1.5em] min-h-[1.5em] my-2">{title}</h2>
        <div
          className="h-60 coding inverse-toggle px-5 shadow-lg text-gray-100 text-sm font-mono subpixel-antialiased 
              bg-gray-800  pb-6 pt-4 rounded-lg leading-normal overflow-hidden"
        >
          <div className="top mb-2 flex">
            <div className="h-3 w-3 bg-red-500 rounded-full"></div>
            <div className="ml-2 h-3 w-3 bg-orange-300 rounded-full"></div>
            <div className="ml-2 h-3 w-3 bg-green-500 rounded-full"></div>
          </div>
          <div className="mt-4">
            <span className="text-green-400 pr-2">computer:~$</span>deepgram{" "}
            <Typewriter
              component={"span"}
              options={{
                delay: 20,
                autoStart: true,
                loop: true,
              }}
              onInit={(typewriter) => {
                typewriter
                  // example [0]
                  .pauseFor(200)
                  .changeDelay(200 / examples[1].command.length)
                  .callFunction(() => {
                    setTitle(examples[0].title);
                  })
                  .typeString(examples[0].command)
                  .pauseFor(200)
                  .callFunction(() => {
                    setOutput(examples[0].output);
                  })
                  .pauseFor(3000)
                  .callFunction(() => {
                    setOutput("");
                  })
                  .deleteAll(1)
                  // example [1]
                  .pauseFor(200)
                  .changeDelay(200 / examples[1].command.length)
                  .callFunction(() => {
                    setTitle(examples[1].title);
                  })
                  .typeString(examples[1].command)
                  .pauseFor(200)
                  .callFunction(() => {
                    setOutput(examples[1].output);
                  })
                  .pauseFor(3000)
                  .callFunction(() => {
                    setOutput("");
                  })
                  .deleteAll(1)
                  // example [2]
                  .pauseFor(200)
                  .changeDelay(200 / examples[2].command.length)
                  .callFunction(() => {
                    setTitle(examples[2].title);
                  })
                  .typeString(examples[2].command)
                  .pauseFor(200)
                  .callFunction(() => {
                    setOutput(examples[2].output);
                  })
                  .pauseFor(3000)
                  .callFunction(() => {
                    setOutput("");
                  })
                  .deleteAll(1)
                  // example [3]
                  .pauseFor(200)
                  .changeDelay(200 / examples[3].command.length)
                  .callFunction(() => {
                    setTitle(examples[3].title);
                  })
                  .typeString(examples[3].command)
                  .pauseFor(200)
                  .callFunction(() => {
                    setOutput(examples[3].output);
                  })
                  .pauseFor(3000)
                  .callFunction(() => {
                    setOutput("");
                  })
                  .deleteAll(1)
                  // example [4]
                  .pauseFor(200)
                  .changeDelay(200 / examples[4].command.length)
                  .callFunction(() => {
                    setTitle(examples[4].title);
                  })
                  .typeString(examples[4].command)
                  .pauseFor(200)
                  .callFunction(() => {
                    setOutput(examples[4].output);
                  })
                  .pauseFor(3000)
                  .callFunction(() => {
                    setOutput("");
                  })
                  .deleteAll(1)

                  .start();
              }}
            />
          </div>
          <div className="leading-6 text-gray-400">
            <pre>{output}</pre>
          </div>
        </div>
      </div>
    </main>
  );
}
