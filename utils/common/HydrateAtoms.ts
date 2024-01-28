import { useSetAtom } from "jotai";
import { useHydrateAtoms } from "jotai/utils";
import { selectCodeAtom } from "@/context/atoms";
import { useEffect } from "react";

const HydrateAtoms = ({ initialValues, children }) => {
  useHydrateAtoms(initialValues);

  const setState = useSetAtom(selectCodeAtom);

  useEffect(() => {
    setState((prev) =>
      prev === initialValues ? prev : { ...prev, ...initialValues[0][1] }
    );
  }, [setState, initialValues]);

  return children;
};

export default HydrateAtoms;
