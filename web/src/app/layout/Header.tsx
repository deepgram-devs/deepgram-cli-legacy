import { useEffect, useState } from "react";
import Margin from "./Margin";

type Props = {
  className?: string;
  children: React.ReactNode;
};

const Header = ({ className = "", children }: Props) => {
  const [scrollTop, setScrollTop] = useState(0);

  const scroller = (e) => {
    const scrollTop = e?.target.documentElement.scrollTop ?? 0;
    setScrollTop(scrollTop);
  };

  useEffect(() => {
    window.addEventListener("scroll", scroller);

    return () => window.removeEventListener("scroll", scroller);
  }, []);

  const classMap = (percent: number) => {
    switch (true) {
      case percent > 200:
        return "dark:to-black/80 dark:from-black/80 to-white/80 from-white/80";
      case percent > 150:
        return "dark:to-black/70 dark:from-black/80 to-white/70 from-white/80";
      case percent > 100:
        return "dark:to-black/60 dark:from-black/80 to-white/60 from-white/80";
      case percent > 50:
        return "dark:to-black/50 dark:from-black/80 to-white/50 from-white/80";
      default:
        return "dark:to-black/40 dark:from-black/80 to-white/40 from-white/80";
    }
  };

  return (
    <>
      <nav
        className={`fixed inset-x-0 bg-gradient-to-b glass-blur ${className} ${classMap(
          scrollTop
        )}`}
      >
        <Margin>{children}</Margin>
      </nav>
    </>
  );
};

export default Header;
