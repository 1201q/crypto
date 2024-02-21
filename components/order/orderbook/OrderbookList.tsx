import styled from "styled-components";
import OrderbookRow from "./OrderbookRow";
import { useAtom } from "jotai";
import { orderbookVolumeDisplayModeAtom } from "@/context/atoms";
import Down from "@/public/caret-down.svg";

const OrderbookList = () => {
  const renderArray = Array(30).fill(null);
  const [displayMode, setDisplayMode] = useAtom(orderbookVolumeDisplayModeAtom);
  return (
    <Container>
      {renderArray.map((d, index) => (
        <OrderbookRow index={index} key={index} />
      ))}
      <OrderbookController>
        <ChangeViewMode
          onClick={() => {
            setDisplayMode((prev) => !prev);
          }}
        >
          {displayMode ? "수량" : "총액"}
          <Down
            width={13}
            height={13}
            fill={"#808080"}
            style={{ marginTop: "-1px", marginLeft: "3px" }}
          />
        </ChangeViewMode>
      </OrderbookController>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  border-right: 1px solid #f1f2f2;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const OrderbookController = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  position: sticky;
  bottom: -1px;
  height: 30px;
  background-color: ${(props) => props.theme.bg.default};
  border-top: 1px solid #f1f2f2;
`;

const ChangeViewMode = styled.div`
  display: flex;
  align-items: center;
  font-size: 13px;
  font-weight: 500;
  color: #808080;
  padding-right: 5px;
  cursor: pointer;
`;

export default OrderbookList;
