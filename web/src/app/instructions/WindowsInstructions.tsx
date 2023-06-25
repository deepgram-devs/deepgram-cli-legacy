import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWindows } from "@fortawesome/free-brands-svg-icons";
import CommandLine from "../CommandLine";

const WindowsInstructions = () => {
  return (
    <>
      <code className="cta code">
        <CommandLine>scoop install deepgram</CommandLine>
      </code>{" "}
      or{" "}
      <a href="#" className="cta button">
        <FontAwesomeIcon icon={faWindows} className="h-6 -my-1 mr-2" /> Download
        for Windows
      </a>
    </>
  );
};

export default WindowsInstructions;
