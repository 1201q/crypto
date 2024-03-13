import useOutSideClick from "@/utils/hooks/useOutSideClick";
import { useSetAtom } from "jotai";
import { useRouter } from "next/router";
import { useRef } from "react";

const useBottomSheet = (atom: any) => {
  const router = useRouter();
  const modalRef = useRef(null);

  const setIsModalOpen = useSetAtom(atom);

  useOutSideClick([modalRef], () => {
    close();
  });

  const close = () => {
    setIsModalOpen(false);
    router.back();
  };
  const open = () => {};
};
export default useBottomSheet;
