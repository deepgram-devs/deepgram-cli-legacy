import { useEffect, useState } from "react";
import Margin from "./Margin";

type Props = {
  className?: string;
  children: React.ReactNode;
};

const Header = ({ className = "", children }: Props) => {
  const [scrollTop, setScrollTop] = useState(0);

  const scroller = (e: any) => {
    const scrollTop = e?.target.documentElement.scrollTop ?? 0;
    setScrollTop(scrollTop);
  };

  useEffect(() => {
    window.addEventListener("scroll", scroller);

    return () => window.removeEventListener("scroll", scroller);
  }, []);

  const classMap = (percent: number) => {
    switch (true) {
      case percent > 400:
        return "dark:to-black/60 dark:from-black/60 to-white/60 from-white/60";
      case percent > 300:
        return "dark:to-black/50 dark:from-black/60 to-white/50 from-white/60";
      case percent > 200:
        return "dark:to-black/40 dark:from-black/60 to-white/40 from-white/60";
      case percent > 100:
        return "dark:to-black/30 dark:from-black/60 to-white/30 from-white/60";
      default:
        return "dark:to-black/20 dark:from-black/60 to-white/20 from-white/60";
    }
  };

  return (
    <>
      <nav
        className={`z-20 fixed inset-x-0 bg-gradient-to-b glass-blur border-b border-white/90 dark:border-black/90 ${className} ${classMap(
          scrollTop
        )}`}
      >
        <Margin className="justify-between flex-row px-10 py-7">
          {children}
        </Margin>
      </nav>
    </>
  );
};

export default Header;
