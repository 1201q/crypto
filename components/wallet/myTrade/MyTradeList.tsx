import {
  isSelectOptionModalOpen,
  isSelectSortCoinModalOpenAtom,
  selectTradeSortOption,
  selectSortCoinAtom,
} from "@/context/atoms";
import { IconExchange } from "@/public/svgs";
import { motion } from "framer-motion";
import { useAtomValue, useSetAtom } from "jotai";
import { useRouter } from "next/router";
import styled from "styled-components";

const MyTradeList = () => {
  const router = useRouter();
  const openOptionModal = useSetAtom(isSelectOptionModalOpen);
  const openSelectCoinModal = useSetAtom(isSelectSortCoinModalOpenAtom);
  const selectOption = useAtomValue(selectTradeSortOption);
  const selectSortCoin = useAtomValue(selectSortCoinAtom);
  return (
    <>
      <SortHeader>
        <Flex
          onClick={() => {
            openOptionModal(true);
            router.push(
              {
                pathname: router.pathname,
                query: { ...router.query, open: true },
              },
              `${router.asPath}?`,
              { shallow: true }
            );
          }}
        >
          <p>{selectOption?.name}</p>
          <IconExchange width={13} height={13} />
        </Flex>
        <SelectCoin
          initial={{ scale: 1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            router.push(
              {
                pathname: router.pathname,
                query: { ...router.query, open: true },
              },
              `${router.asPath}?`,
              { shallow: true }
            );
            openSelectCoinModal(true);
          }}
        >
          {!selectSortCoin ? "전체보기" : selectSortCoin?.korean_name}
        </SelectCoin>
      </SortHeader>
      <div style={{ height: "100dvh" }}>1</div>
    </>
  );
};

const SortHeader = styled.div`
  position: sticky;
  top: 50px;
  display: flex;

  align-items: center;
  justify-content: space-between;

  cursor: pointer;
  height: 45px;
  padding: 0px 20px;
  background-color: white;
  border-bottom: 1px solid #f1f2f2;
  z-index: 2;

  p {
    font-size: 15px;
    font-weight: 500;
    color: ${(props) => props.theme.font.darkgray};
    margin-right: 6px;
  }

  svg {
    fill: ${(props) => props.theme.font.darkgray};
    margin-top: 1px;
  }
`;

const Flex = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
`;

const SelectCoin = styled(motion.button)`
  height: 27px;
  border: none;
  padding: 0px 10px;
  border-radius: 6px;
  cursor: pointer;
  color: #6b7684;
  background-color: #f2f4f6;
  font-weight: 500;
`;

export default MyTradeList;
