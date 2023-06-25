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
        <Margin>
          <div className="mx-auto max-w-2xl pt-32 pb-20 sm:pt-48 lg:pt-56">
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
                You can now use Deepgram from the command line.
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-300">
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
            </div>
          </div>
        </Margin>
      </Section>
    </>
  );
};

export default Hero;
