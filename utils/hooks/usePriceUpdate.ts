import { useEffect, useRef, useState } from "react";

const usePriceUpdate = (price: number) => {
  const updateTimerRef = useRef<NodeJS.Timeout>();
  const [isRendered, setIsRendered] = useState<boolean>(false);
  const [currentPrice, setCurrentPrice] = useState<number>(0);
  const [isUpdated, setIsUpdated] = useState(false);

  useEffect(() => {
    setIsRendered(true);
    setCurrentPrice(price);

    return () => {
      if (updateTimerRef.current) {
        clearTimeout(updateTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    // 처음 렌더가 되는 경우는 무시함.
    if (isRendered && currentPrice !== price) {
      // price의 변화가 생긴경우
      if (updateTimerRef.current) {
        // 기존에 TIMER가 있다면 종료
        clearTimeout(updateTimerRef.current);
      }

      updateTimerRef.current = setTimeout(() => {
        setIsUpdated(false);
      }, 200);

      setIsUpdated(true);

      setCurrentPrice((prev) => {
        if (prev !== price) {
          return price;
        }
        return prev;
      });
    }
  }, [price]);

  return { isUpdated };
};

export default usePriceUpdate;
