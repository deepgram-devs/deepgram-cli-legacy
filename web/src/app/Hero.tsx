import { useEffect, useState } from "react";
import {
  DefaultInstructions,
  LinuxInstructions,
  MacInstructions,
  WindowsInstructions,
} from "./instructions/index";
import Margin from "./layout/Margin";
import Section from "./layout/Section";

const Hero = () => {
  const [os, setOs] = useState<null | string>(null);
  const [installer, setInstaller] = useState<React.ReactNode | string>(null);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setOs(window.navigator.appVersion);
    }
  }, []);

  useEffect(() => {
    switch (true) {
      case os?.includes("Macintosh"):
        setInstaller(<MacInstructions />);
        break;
      case os?.includes("Windows"):
        setInstaller(<WindowsInstructions />);
        break;
      case os?.includes("Linux"):
        setInstaller(<LinuxInstructions />);
        break;
      default:
        setInstaller(<DefaultInstructions />);
        break;
    }
  }, [os]);

  return (
    <>
      <Section>
        <Margin className="flex-col p-6">
          <div className="mx-auto max-w-2xl pt-24 pb-20 sm:pt-40 lg:pt-44">
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tight dark:text-white sm:text-6xl">
                You can now use Deepgram from the command line.
              </h1>
              <p className="mt-6 text-lg leading-8 dark:text-gray-300 text-gray-700">
                The{" "}
                <abbr title="Deepgram command line interface">
                  Deepgram CLI
                </abbr>{" "}
                brings your transcriptions and configuration to the terminal.
              </p>
              {installer && (
                <div className="mt-10 flex items-center justify-center gap-x-6">
                  {installer}
                </div>
              )}
              <p className="pt-4">
                Read more or contribute on{" "}
                <a
                  href="https://deepgram.com/contact-us?utm_source=cli&utm_campaign=cli&utm_medium=cli"
                  target="_blank"
                  className="dark:text-white underline"
                >
                  the GitHub Repository
                </a>
                .
              </p>
            </div>
          </div>
        </Margin>
      </Section>
    </>
  );
};

export default Hero;
