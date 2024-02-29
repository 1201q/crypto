import { useCallback } from "react";

const useScrollTop = () => {
  const scrollToTop = useCallback(() => {
    const element = document.body;
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  }, []);

  return { scrollToTop };
};

export default useScrollTop;
