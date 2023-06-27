import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faApple } from "@fortawesome/free-brands-svg-icons";
import CommandLine from "../CommandLine";

const MacInstructions = () => {
  return (
    <>
      <code className="cta code">
        <CommandLine>brew install deepgram</CommandLine>
      </code>{" "}
      or{" "}
      <a href="#" className="cta button">
        <FontAwesomeIcon icon={faApple} className="h-6 -my-1 mr-2" /> Download
        for Mac
      </a>
    </>
  );
};

export default MacInstructions;
