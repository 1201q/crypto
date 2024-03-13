import {
  buyOrderDataAtom,
  orderSideAtom,
  sellOrderDataAtom,
} from "@/context/order";
import f from "@/utils/common/formatting";
import getKR from "@/utils/common/getKR";
import { useList } from "@/utils/hooks/useList";

import { motion } from "framer-motion";
import { useAtom } from "jotai";

import styled from "styled-components";
import Image from "next/image";
import { useRouter } from "next/router";

const ConfirmModal = () => {
  const router = useRouter();
  const BlurURL =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg==";
  const { coinList } = useList();

  const [side] = useAtom(orderSideAtom);

  const [buyOrderData] = useAtom(buyOrderDataAtom);
  const [sellOrderData] = useAtom(sellOrderDataAtom);

  return (
    <Container>
      <ModalContainer
        initial={{ y: 300 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.1, type: "just" }}
        exit={{ y: 300 }}
      >
        <IconContainer>
          <CodeIcon>
            <Image
              src={`${process.env.NEXT_PUBLIC_LOGO_API_URL}${f(
                "code",
                buyOrderData.code
              )}.png`}
              alt={"logo"}
              width={23}
              height={23}
              placeholder="blur"
              blurDataURL={BlurURL}
            />
          </CodeIcon>
        </IconContainer>
        <OrderInfoContainer>
          <Name>{getKR(coinList.data, buyOrderData.code)}</Name>
          <Price>
            {side === "buy"
              ? `${f("fixedPrice", buyOrderData.total)}원`
              : `${sellOrderData.total.toLocaleString()}`}
          </Price>
          <PriceType color={side === "buy" ? "#df5068" : "#448aef"}>
            {`시장가 ${side === "buy" ? "매수" : "매도"} 주문`}
          </PriceType>
        </OrderInfoContainer>
        <ButtonContainer>
          <Button
            bgcolor={"#f2f4f6"}
            whileTap={{ scale: 0.98 }}
            initial={{ scale: 1 }}
            transition={{ duration: 0.1 }}
            onClick={() => {
              router.back();
            }}
          >
            취소
          </Button>
          <Button
            bgcolor={side === "buy" ? "#df5068" : "#448aef"}
            whileTap={{ scale: 0.98 }}
            initial={{ scale: 1 }}
            transition={{ duration: 0.1 }}
            color={"white"}
          >
            {side === "buy" ? "매수" : "매도"}
          </Button>
        </ButtonContainer>
      </ModalContainer>
    </Container>
  );
};

const Container = styled(motion.div)`
  position: absolute;
  bottom: 0;
  right: 0;
  height: 100dvh;
  width: 100%;
  overflow-y: hidden;
  z-index: 200;
  background-color: ${(props) => props.theme.bg.modalBg};
`;
const ModalContainer = styled(motion.div)`
  position: absolute;
  bottom: 0px;
  width: 100%;
  height: 43dvh;
  min-height: 300px;
  background-color: white;
  border-top-right-radius: 33px;
  border-top-left-radius: 33px;
  padding: 25px 15px 15px 15px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const OrderInfoContainer = styled.div`
  height: 100%;
`;

const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const CodeIcon = styled.div`
  width: 36px;
  height: 36px;
  background-color: #f2f4f6;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Name = styled.p`
  font-size: 31px;
  font-weight: 800;
  text-align: center;
  margin-bottom: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
const Price = styled.p`
  font-size: 25px;
  font-weight: 600;
  text-align: center;
  margin-bottom: 20px;
`;

const PriceType = styled.p<{ color: string }>`
  font-size: 17px;
  font-weight: 600;
  text-align: center;
  color: ${(props) => props.color};
`;

const ButtonContainer = styled.div`
  display: grid;
  grid-template-columns: 3fr 7fr;
  gap: 10px;
`;

const Button = styled(motion.button)<{ bgcolor: string; color?: string }>`
  background-color: ${(props) => props.bgcolor};
  width: 100%;
  height: 45px;
  border-radius: 12px;
  border: none;
  color: ${(props) => (props.color ? props.color : props.theme.font.darkgray)};
  font-size: 17px;
  font-weight: 700;
  cursor: pointer;
`;

export default ConfirmModal;
