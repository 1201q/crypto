import { throttle } from "lodash";
import { useEffect, useRef } from "react";

const useScrollDirection = (
  callback: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const beforeScrollY = useRef(0);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = throttle(() => {
    const scrollY = window.scrollY;
    const mobileScrollThreshold = 15;

    const diff = Math.abs(scrollY - beforeScrollY.current);

    if (diff > mobileScrollThreshold) {
      if (scrollY > beforeScrollY.current) {
        callback(false);
      } else {
        callback(true);
      }

      beforeScrollY.current = scrollY;
    }
  }, 50);
};

export default useScrollDirection;
