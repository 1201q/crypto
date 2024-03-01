import { useEffect, useRef, useState } from "react";
import { ChangeEvent } from "react";

const useInput = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [value, setValue] = useState("");
  const [isFocus, setIsFocus] = useState(false);

  useEffect(() => {
    const handleFocus = () => setIsFocus(true);
    const handleBlur = () => setIsFocus(false);

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
    setValue(value);
  };

  return { inputRef, value, onChange, isFocus };
};
export default useInput;
