import {
  selectTradeSortOption,
  selectSortCoinAtom,
  modalAtom,
} from "@/context/atoms";
import { IconExchange } from "@/public/svgs";
import { motion } from "framer-motion";
import { useAtomValue, useSetAtom } from "jotai";

import styled from "styled-components";

import TradeItem from "../item/TradeItem";
import DateDivider from "./DateDivider";
import { sortedTradeDataAtom, reducedTradeDataAtom } from "@/context/wallet";

import { GroupedVirtuoso } from "react-virtuoso";

const MyTradeList = () => {
  const selectOption = useAtomValue(selectTradeSortOption);
  const selectSortCoin = useAtomValue(selectSortCoinAtom);
  const setModal = useSetAtom(modalAtom);

  const dateData = useAtomValue(reducedTradeDataAtom);
  const tradeData = useAtomValue(sortedTradeDataAtom);

  return (
    <>
      <SortHeader>
        <Flex
          onClick={() => {
            setModal("tradeOption");
          }}
        >
          <p>{selectOption?.name}</p>
          <IconExchange width={13} height={13} />
        </Flex>
        {selectOption?.side !== "krw" && (
          <SelectCoin
            initial={{ scale: 1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setModal("selectCoin");
            }}
          >
            {!selectSortCoin ? "전체보기" : selectSortCoin?.korean_name}
          </SelectCoin>
        )}
      </SortHeader>
      <ListContainer>
        <GroupedVirtuoso
          useWindowScroll
          groupCounts={dateData.map((itemCount) => itemCount[1].length)}
          itemContent={(index) => (
            <TradeItem
              index={index}
              key={tradeData[index]?.id}
              id={tradeData[index]?.id}
              side={tradeData[index]?.side}
              total={tradeData[index]?.total}
              time={tradeData[index]?.timestamp}
              code={tradeData[index]?.code}
              amount={tradeData[index]?.amount}
              price={tradeData[index]?.price}
            />
          )}
          groupContent={(index) => <DateDivider date={dateData[index][0]} />}
        />
      </ListContainer>
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

const ListContainer = styled.div`
  min-height: ${(props) => props.theme.height.walletTradeList};
`;

export default MyTradeList;
