type Props = {
  className?: string;
  children: React.ReactNode;
};

const Margin = ({ className = "", children }: Props) => {
  return (
    <>
      <div
        className={`w-full max-w-screen-xl mx-auto flex flex-col p-6 ${className}`}
      >
        {children}
      </div>
    </>
  );
};

export default Margin;
