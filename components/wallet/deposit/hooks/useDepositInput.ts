import { useEffect, useRef, useState } from "react";
import { ChangeEvent } from "react";

const useDepositInput = () => {
  const MAX_KRW = 100000000;
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [value, setValue] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [isFocus, setIsFocus] = useState(false);
  const [inputLimit, setIsInputLimit] = useState(false);

  useEffect(() => {
    const handleFocus = () => setIsFocus(true);
    const handleBlur = () => {
      setIsFocus(false);
      setIsInputLimit(false);
    };

    const inputElement = inputRef.current;

    if (inputElement) {
      inputElement.addEventListener("focus", handleFocus);
      inputElement?.addEventListener("blur", handleBlur);
    }

    return () => {
      inputElement?.removeEventListener("focus", handleFocus);
      inputElement?.removeEventListener("blur", handleBlur);
    };
  }, []);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const length = value.length;

    const replace = value.replaceAll(/[^0-9]/g, "");
    const isValueLimit = Number(replace) > MAX_KRW;

    if (isValueLimit) {
      setInputValue(MAX_KRW.toLocaleString());
      setValue(MAX_KRW);
      setIsInputLimit(true);
    }

    if (!isValueLimit && !(length === 1 && value === "0")) {
      setInputValue(Number(replace).toLocaleString());
      setValue(Number(replace));
      setIsInputLimit(false);
    }
  };

  return { inputRef, inputValue, value, onChange, isFocus, inputLimit };
};
export default useDepositInput;
