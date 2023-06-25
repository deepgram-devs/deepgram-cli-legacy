type Props = {
  className?: string;
  children: React.ReactNode;
};

const Margin = ({ className = "", children }: Props) => {
  return (
    <>
      <div className={`w-full max-w-screen-xl mx-auto flex ${className}`}>
        {children}
      </div>
    </>
  );
};

export default Margin;
