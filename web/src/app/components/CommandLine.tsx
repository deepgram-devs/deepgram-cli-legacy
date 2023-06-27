type Props = {
  className?: string;
  children: React.ReactNode;
  prefix?: boolean;
};

const CommandLine = ({ className = "", children, prefix = true }: Props) => {
  return (
    <span
      className={`text-black dark:text-white font-semibold font-mono ${className}`}
    >
      {prefix && <span className="gradient-text pr-2">computer:~$</span>}
      {children}
    </span>
  );
};

export default CommandLine;
