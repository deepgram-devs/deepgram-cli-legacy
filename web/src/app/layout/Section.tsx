type Props = {
  className?: string;
  children: React.ReactNode;
};

const Section = ({ className = "", children }: Props) => {
  return (
    <>
      <section className={`flex w-full flex-col ${className}`}>
        {children}
      </section>
    </>
  );
};

export default Section;
