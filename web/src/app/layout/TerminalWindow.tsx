import Glass from "../Glass";

type Props = {
  className?: string;
  children: React.ReactNode;
};

const TerminalWindow = ({ className = "", children }: Props) => {
  return (
    <>
      <Glass
        className={[
          "h-80",
          "inverse-toggle",
          "px-5",
          "shadow-lg",
          "font-mono",
          "subpixel-antialiased",
          "pb-6",
          "pt-4",
          "leading-normal",
          "overflow-hidden",
          "glass-round",
          "glass-border",
          "glass-blur",
          "glass-shadow",
          className,
        ].join(" ")}
      >
        <div className="top mb-2 flex">
          <div className="h-3 w-3 dark:bg-gray-500 bg-gray-600 rounded-full"></div>
          <div className="ml-2 h-3 w-3 dark:bg-gray-500 bg-gray-600 rounded-full"></div>
          <div className="ml-2 h-3 w-3 dark:bg-gray-500 bg-gray-600 rounded-full"></div>
        </div>
        <div>
          <pre className="block max-w-fit text-gray-700 dark:text-gray-200 overflow-hidden break-words whitespace-pre-wrap">
            {children}
          </pre>
        </div>
      </Glass>
    </>
  );
};

export default TerminalWindow;
