type Props = {
  className?: string;
  children: React.ReactNode;
};

const Glass = ({ className = "", children }: Props) => {
  return (
    <>
      <div className={`glass dark:glass-dark p-6 ${className}`}>{children}</div>
    </>
  );
};

export default Glass;
