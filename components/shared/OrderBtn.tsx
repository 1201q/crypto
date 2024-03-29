import { queryCodeAtom } from "@/context/atoms";
import { motion } from "framer-motion";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import styled from "styled-components";

const OrderBtn = () => {
  const router = useRouter();
  const [queryCode] = useAtom(queryCodeAtom);
  return (
    <Container>
      <BtnContainer>
        <BidBtn
          onClick={() => {
            router.push(
              {
                pathname: `/market/${queryCode}/order`,
                query: { access: true },
              },
              `/market/${queryCode}/order`
            );
          }}
          whileTap={{ backgroundColor: "#28528F", scale: 0.99 }}
          initial={{ scale: 1 }}
          transition={{ duration: 0.1 }}
        >
          거래하기
        </BidBtn>
      </BtnContainer>
    </Container>
  );
};

const Container = styled.div`
  position: sticky;
  bottom: 0px;
  z-index: 100;
`;

const BtnContainer = styled.div`
  padding: 0px 20px 20px 20px;
`;

const BidBtn = styled(motion.button)`
  background-color: #448aef;
  width: 100%;
  height: 54px;
  border-radius: 15px;
  border: none;
  color: white;
  font-size: 18px;
  font-weight: 700;
  cursor: pointer;
  padding: 0;
`;

export default OrderBtn;
