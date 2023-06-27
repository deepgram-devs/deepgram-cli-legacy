type Props = {
  command: string;
};

const Heading = ({ command }: Props) => {
  return (
    <h2 className="dark:text-white text-3xl block h-[1.5em] min-h-[1.5em] my-2 capitalize">
      {command}{" "}
      <small className="text-sm uppercase underline">
        <a
          href={`https://github.com/deepgram-devs/deepgram-cli#deepgram-${command}`}
          target="_blank"
        >
          Read more
        </a>
      </small>
    </h2>
  );
};

export default Heading;
