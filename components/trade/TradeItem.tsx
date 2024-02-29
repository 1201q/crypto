import { tradeListVolumeDisplayModeAtom } from "@/context/atoms";
import f from "@/utils/common/formatting";
import dayjs from "dayjs";
import { motion } from "framer-motion";
import { useAtom } from "jotai";

import styled from "styled-components";

interface RowPropsType {
  timestamp: number;
  price: number;
  volume: number;
  change: string;
  askOrBid: string;
}

const TradeItem: React.FC<RowPropsType> = ({
  timestamp,
  price,
  volume,
  change,
  askOrBid,
}) => {
  const [volumeDisplayMode] = useAtom(tradeListVolumeDisplayModeAtom);
  const handleColor = (color: string) => {
    if (color === "blue") {
      return "#448aef";
    } else if (color === "red") {
      return "#df5068";
    } else {
      return "#6b7684";
    }
  };

  const getColor = (change: string | undefined, askBid: string | undefined) => {
    let color = "";

    if (change && change === "RISE") {
      color = "red";
    } else if (change && change === "FALL") {
      color = "blue";
    }

    if (askBid && askBid === "BID") {
      color = "red";
    } else if (askBid && askBid === "ASK") {
      color = "blue";
    }

    return handleColor(color);
  };

  return (
    <Container>
      <Data sort={"flex-start"}>{dayjs(timestamp).format("HH:mm:ss")}</Data>
      <Data color={getColor(change, undefined)} sort={"flex-end"}>
        {f("price", price)}
      </Data>
      <Data color={getColor(undefined, askOrBid)} sort={"flex-end"}>
        {volumeDisplayMode
          ? volume.toFixed(5)
          : f("fixedPrice", price * volume)}
      </Data>
    </Container>
  );
};

const Container = styled(motion.div)`
  display: grid;
  grid-template-columns: 1fr 2fr 2fr;
  height: 46px;
  padding: 5px 20px 5px 20px;
  background-color: white;
  border-bottom: 1px solid #f1f2f2;
`;

const Data = styled.div<{ sort: string; color?: string }>`
  display: flex;
  align-items: center;
  justify-content: ${(props) => props.sort};
  font-size: 15px;
  font-weight: 500;
  letter-spacing: -0.5px;
  color: ${(props) => props.color};
`;

export default TradeItem;
