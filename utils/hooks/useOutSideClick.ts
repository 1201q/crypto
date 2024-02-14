import { useState, useEffect } from "react";

const useOutSideClick = (ref: React.RefObject<HTMLElement>) => {
  const [isFocus, setIsFocus] = useState(false);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsFocus(false);
      } else {
        setIsFocus(true);
      }
    };

    window.addEventListener("mousedown", handleClick);

    return () => {
      window.removeEventListener("mousedown", handleClick);
    };
  }, []);

  return isFocus;
};

export default useOutSideClick;
