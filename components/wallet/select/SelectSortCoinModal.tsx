import {
  isSelectSortCoinModalOpenAtom,
  selectSortCoinAtom,
} from "@/context/atoms";
import { IconX } from "@/public/svgs";
import { IconSearch } from "@/public/svgs";

import useOutSideClick from "@/utils/hooks/useOutSideClick";
import { motion } from "framer-motion";
import { useAtom, useSetAtom } from "jotai";
import { useRouter } from "next/router";
import { useRef } from "react";
import styled from "styled-components";
import useSearchAndFilter from "./hooks/useSearchAndFilter";
import { Virtuoso } from "react-virtuoso";

const SelectSortCoinModal = () => {
  const router = useRouter();
  const modalRef = useRef(null);

  const setIsModalOpen = useSetAtom(isSelectSortCoinModalOpenAtom);
  const { inputRef, keyword, onChange, clearInput, filteredCoins } =
    useSearchAndFilter();

  useOutSideClick([modalRef], () => {
    setIsModalOpen(false);
    router.back();
  });

  const [, setSelectSortCoin] = useAtom(selectSortCoinAtom);
  console.log(filteredCoins?.length);

  return (
    <Container>
      <ModalContainer
        ref={modalRef}
        initial={{ y: 300 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.1, type: "just" }}
        exit={{ y: 800 }}
      >
        <HeaderContainer>
          <p>코인선택</p>
          <button
            onClick={() => {
              setIsModalOpen(false);
              router.back();
            }}
          >
            <IconX width={25} height={25} />
          </button>
        </HeaderContainer>
        <SearchContainer>
          <SearchInput>
            <IconSearch
              width={17}
              height={17}
              fill={"#b7bfc7"}
              style={{
                cursor: "pointer",
              }}
            />
            <Input
              type="text"
              placeholder="가상자산을 검색해보세요"
              maxLength={20}
              value={keyword}
              onChange={onChange}
            />
            <IconX
              width={22}
              height={22}
              fill={"#b7bfc7"}
              style={{
                cursor: "pointer",
              }}
              onClick={() => clearInput()}
            />
          </SearchInput>
        </SearchContainer>
        <OptionContainer>
          <Option
            initial={{ backgroundColor: "white" }}
            whileTap={{ backgroundColor: "#f2f4f6" }}
            onClick={() => {
              setSelectSortCoin(null);
              setIsModalOpen(false);
              router.back();
            }}
            $isAll={true}
          >
            전체보기
          </Option>

          <Virtuoso
            data={filteredCoins}
            style={{ height: "calc(90dvh - 155px)" }}
            itemContent={(index, coin) => (
              <Option
                $isAll={false}
                onClick={() => {
                  setSelectSortCoin(coin);
                  setIsModalOpen(false);
                  router.back();
                }}
                initial={{ backgroundColor: "white" }}
                whileTap={{ backgroundColor: "#f2f4f6" }}
                key={coin.market}
              >
                {coin.korean_name}
              </Option>
            )}
            totalCount={filteredCoins?.length}
            fixedItemHeight={45}
          />
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
  height: 90dvh;

  background-color: white;
  border-top-right-radius: 25px;
  border-top-left-radius: 25px;

  display: flex;
  flex-direction: column;
`;

const OptionContainer = styled.div`
  max-height: calc(100% - 110px);
  padding: 0px 0px 12px 0px;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`;

const HeaderContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;

  p {
    color: ${(props) => props.theme.font.black};
    font-size: 18px;
    font-weight: 700;
  }

  button {
    position: absolute;
    right: 10px;
    margin-top: 0px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5px;
    background: none;
    cursor: pointer;
  }
`;

const SearchContainer = styled.div`
  padding: 0px 20px;
  height: 40px;
  margin-bottom: 10px;
`;

const SearchInput = styled.div`
  padding: 0px 13px;
  height: 100%;
  background-color: ${(props) => props.theme.bg.default};
  border-radius: 7px;
  position: relative;
  display: flex;
  align-items: center;
`;

const Input = styled.input`
  width: 100%;
  padding: 0px 10px;
  height: 100%;
  background: none;
`;

const Option = styled(motion.div)<{ $isAll: boolean }>`
  display: flex;
  align-items: center;
  width: 100%;
  min-height: 45px;
  padding: 0px 20px;
  background: none;
  font-size: 17px;
  font-weight: ${(props) => (props.$isAll ? 400 : 400)};
  color: ${(props) =>
    props.$isAll ? props.theme.font.blue : props.theme.font.darkgray};
  cursor: pointer;
`;

export default SelectSortCoinModal;
