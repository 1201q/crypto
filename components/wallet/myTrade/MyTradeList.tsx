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
import { walletTradeListDataAtom } from "@/context/wallet";
import { KRwTradeDataType, OtherTradeDataType } from "@/types/types";
import dayjs from "dayjs";

const MyTradeList = () => {
  const selectOption = useAtomValue(selectTradeSortOption);
  const selectSortCoin = useAtomValue(selectSortCoinAtom);
  const setModal = useSetAtom(modalAtom);

  const data = useAtomValue(walletTradeListDataAtom);

  console.log(dayjs("2024-03-17T17:40:35+09:00").unix());

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
        <SelectCoin
          initial={{ scale: 1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            setModal("selectCoin");
          }}
        >
          {!selectSortCoin ? "전체보기" : selectSortCoin?.korean_name}
        </SelectCoin>
      </SortHeader>
      <div style={{ minHeight: "100dvh" }}>
        {data.map((v, i) => {
          if (v.side === "krw") {
            const d = v as KRwTradeDataType;
            return (
              <TradeItem
                code={"KRW"}
                total={d.total}
                side={"krw"}
                time={d.timestamp}
              />
            ); // 타입 지정
          } else {
            const d = v as OtherTradeDataType;
            return (
              <TradeItem
                code={d.code}
                total={d.total}
                amount={d.amount}
                side={d.side}
                time={d.timestamp}
              />
            ); // 타입지정
          }
        })}
      </div>
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
