import { orderbookVolumeDisplayModeAtom } from "@/context/atoms";
import { usePrice } from "@/context/hooks";
import {
  selectOrderbookPriceAtom,
  selectOrderbookBarWidthAtom,
  selectOrderbookSizeAtom,
} from "@/context/orderbook";
import f from "@/utils/common/formatting";
import { useAtom } from "jotai";
import { useMemo, useDeferredValue } from "react";
import styled from "styled-components";

interface BarPropsType {
  type: "sell" | "buy";
  width: string | number;
}

const OrderbookRow: React.FC<any> = ({ index }) => {
  const [displayMode] = useAtom(orderbookVolumeDisplayModeAtom);
  const [price] = useAtom(
    useMemo(() => selectOrderbookPriceAtom(index), [index])
  );
  const [size] = useAtom(
    useMemo(() => selectOrderbookSizeAtom(index), [index])
  );

  const [width] = useAtom(
    useMemo(() => selectOrderbookBarWidthAtom(index), [index])
  );

  let deferredWidth = useDeferredValue(width);

  const openingPrice = usePrice("pcp") || 0;
  const tradePrice = usePrice("tp") || 0;
  const type = index < 15 ? "sell" : "buy";

  const percent = useMemo(() => (price - openingPrice) / openingPrice, [price]);

  const getTextColor = (percent: number) => {
    if (percent > 0) {
      return "#df5068";
    } else if (percent < 0) {
      return "#448aef";
    }
    return "#6b7684";
  };

  const getHogaTextColor = (type: string) => {
    if (type === "buy") {
      return "#df5068";
    } else {
      return "#448aef";
    }
  };

  return (
    <Container currentPrice={price === tradePrice} type={type}>
      <PriceBox>
        <Price color={getTextColor(percent)}>{f("price", price)}</Price>
        <Percent>{f("change", percent)}%</Percent>
      </PriceBox>
      <RightBox>
        <Size $color={getHogaTextColor(type)}>
          {displayMode && price
            ? f("orderbookSize", price, size)
            : f("fixedPrice", price * size)}
        </Size>
        <BarContainer>
          <Bar width={deferredWidth} type={index < 15 ? "sell" : "buy"} />
        </BarContainer>
      </RightBox>
    </Container>
  );
};

const Container = styled.div<{ currentPrice: boolean; type: "sell" | "buy" }>`
  display: flex;

  justify-content: space-between;
  align-items: center;
  height: 45px;
  border: ${(props) => (props.currentPrice ? "1px solid #777777" : "none")};
  border-radius: 6px;
`;

const PriceBox = styled.div`
  width: 60%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const RightBox = styled.div`
  width: 40%;
  position: relative;
`;

const Price = styled.p<{ color: string }>`
  font-size: 14px;
  font-weight: 500;
  letter-spacing: -0.5px;
  color: ${(props) => props.color};
`;
const Percent = styled.p`
  margin-top: 4px;
  font-size: 11px;
  letter-spacing: -0.5px;
  color: gray;
`;

const Size = styled.p<{ $color: string }>`
  position: absolute;
  left: 6px;
  top: 7px;
  font-size: 12px;
  font-weight: 400;
  letter-spacing: -0.5px;

  color: ${(props) => props.$color};
`;

const BarContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
`;

const Bar = styled.div.attrs<BarPropsType>((props) => ({
  style: {
    width: `${props.width}%`,
  },
}))<BarPropsType>`
  width: 100%;
  background-color: ${(props) =>
    props.type === "sell" ? "#ebf3fd" : "#fff3f3"};
  height: 25px;
  border-radius: 4px;
`;

export default OrderbookRow;
