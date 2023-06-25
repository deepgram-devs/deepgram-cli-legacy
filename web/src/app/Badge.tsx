type Props = {
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
};

const Badge = ({
  className = "",
  children,
  onClick = () => {
    return;
  },
}: Props) => {
  return (
    <>
      <span
        onClick={onClick}
        className={`bg-black/20 border border-black inline-block whitespace-nowrap rounded-full px-4 py-2 ${className}`}
      >
        {children}
      </span>
    </>
  );
};

export default Badge;
