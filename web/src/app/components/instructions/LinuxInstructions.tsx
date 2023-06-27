import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinux } from "@fortawesome/free-brands-svg-icons";
import CommandLine from "../CommandLine";

const LinuxInstructions = () => {
  return (
    <>
      <code className="cta code">
        <CommandLine>sudo apt install -y deepgram</CommandLine>
      </code>{" "}
      or{" "}
      <a href="#" className="cta button">
        <FontAwesomeIcon icon={faLinux} className="h-6 -my-1 mr-2" /> Download
        for Linux
      </a>
    </>
  );
};

export default LinuxInstructions;
