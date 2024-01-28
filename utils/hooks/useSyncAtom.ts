import { PrimitiveAtom, useSetAtom } from "jotai";
import { useHydrateAtoms } from "jotai/utils";
import { useEffect } from "react";

const useSyncAtom = (
  atom: PrimitiveAtom<string | undefined>,
  value: string | undefined
) => {
  useHydrateAtoms([[atom, value]]);
  const setAtom = useSetAtom(atom);
  useEffect(() => {
    setAtom(value);
  }, [setAtom, value]);
};

export default useSyncAtom;
