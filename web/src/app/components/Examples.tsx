import { useState, Dispatch, SetStateAction } from "react";
import CommandLine from "@/app/components/CommandLine";
import Typewriter from "typewriter-effect";

type Props = {
  children?: React.ReactNode;
  setTitle: Dispatch<SetStateAction<string>>;
};

const examples = [
  {
    command: "setup --key=your-key",
    output: `Config file created at '/Users/lukeoliff/.deepgramrc'
`,
    title: "Setup from the command line",
  },
  {
    command: "transcribe --data-binary=@~/nasa.wav --smart_format",
    output: `Yeah, as as it's worth celebrating the first Space walk with an all female team. I think many of us are looking forward to it just being normal. And I think if it signifies anything, it is to honor the women who came before us who were skilled and qualified and didn't get the same opportunities that we have today.
...`,
    title: "Transcribe local files or remote URLs",
  },
  {
    command: "summary --data-url=https://dpgr.am/spacewalk.wav",
    output: `A speaker discusses the upcoming launch of an all-female Space walking team, which is aimed at honoring skilled and qualified women who missed the same opportunities as the first Space walk. They express excitement for the upcoming launch and hope it will be a normal occurrence.
...`,
    title: "Summarise any video or audio",
  },
  {
    command:
      "transcribe --data-url=https://dpgr.am/spacewalk.wav --utterances --vtt",
    output: `WEBVTT

NOTE
Transcription provided by Deepgram
Duration: 25.933313
Channels: 1

00:00:00.119 --> 00:00:00.199
yeah

00:00:00.997 --> 00:00:03.413
as as it's worth celebrating
...`,
    title: "Output standards compliant caption formats",
  },
  {
    command: "transcribe --data-url https://dpgr.am/spacewalk.wav --json",
    output: `{
  "results": {
    "channels": [
      {
        "alternatives": [
          {
            "transcript": "yeah as as it's worth celebrating the first space walk with an all female team i think many of us are looking forward to it just being normal and i think if it signifies anything it is to honor the women who came before us who were skilled and qualified and didn't get the same opportunities that we have today",
...`,
    title: "Get raw data from any commands",
  },
];

const Examples = ({ children, setTitle }: Props) => {
  const [output, setOutput] = useState("");

  return (
    <>
      <CommandLine>
        deepgram{" "}
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
      </CommandLine>
      <br />
      {output ?? null}
      {children ?? null}
    </>
  );
};

export default Examples;
