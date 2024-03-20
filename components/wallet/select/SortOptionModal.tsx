import { assetSortOptionAtom, tradeSortOptionAtom } from "@/context/atoms";
import useOutSideClick from "@/utils/hooks/useOutSideClick";
import { motion } from "framer-motion";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { useRef } from "react";
import styled from "styled-components";

const SortOptionModal = ({ type }: { type: string }) => {
  const router = useRouter();
  const modalRef = useRef(null);

  useOutSideClick([modalRef], () => {
    router.back();
  });

  const [assetOption, setAssetOption] = useAtom(assetSortOptionAtom);
  const [tradeOption, setTradeOption] = useAtom(tradeSortOptionAtom);

  return (
    <Container>
      <ModalContainer
        ref={modalRef}
        initial={{ y: 300 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.1, type: "just" }}
        exit={{ y: 300 }}
      >
        <HeaderContainer>정렬</HeaderContainer>
        <OptionContainer>
          {type === "trade" &&
            tradeOption.map((option, index) => (
              <Option
                key={option.name}
                $isselect={option.select}
                onClick={() => {
                  setTradeOption(index);

                  router.back();
                }}
                initial={{ backgroundColor: "white" }}
                whileTap={{ backgroundColor: "#f2f4f6" }}
              >
                {option.name}
              </Option>
            ))}
          {type === "asset" &&
            assetOption.map((option, index) => (
              <Option
                key={option.name}
                $isselect={option.select}
                onClick={() => {
                  setAssetOption(index);

                  router.back();
                }}
                initial={{ backgroundColor: "white" }}
                whileTap={{ backgroundColor: "#f2f4f6" }}
              >
                {option.name}
              </Option>
            ))}
        </OptionContainer>
      </ModalContainer>
    </Container>
  );
};

const Container = styled(motion.div)`
  position: fixed;
  bottom: 0;
  left: 50%;
  width: 100%;
  max-width: 838px;
  height: 100dvh;
  overflow-y: hidden;
  z-index: 200;
  background-color: ${(props) => props.theme.bg.modalBg};
  transform: translateX(-50%);
`;
const ModalContainer = styled(motion.div)`
  position: absolute;
  bottom: 0px;
  width: 100%;
  height: fit-content;
  background-color: white;
  border-top-right-radius: 25px;
  border-top-left-radius: 25px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const OptionContainer = styled.div`
  padding: 0px 0px 12px 0px;
  display: flex;
  flex-direction: column;
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
  color: ${(props) => props.theme.font.black};
  font-size: 18px;
  font-weight: 700;
`;

const Option = styled(motion.div)<{ $isselect: boolean }>`
  width: 100%;
  height: 55px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  font-size: 17px;
  font-weight: ${(props) => (props.$isselect ? 700 : 400)};
  color: ${(props) =>
    props.$isselect ? props.theme.font.blue : props.theme.font.darkgray};
  cursor: pointer;
`;

export default SortOptionModal;
