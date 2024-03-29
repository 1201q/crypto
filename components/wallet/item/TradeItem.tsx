import f from "@/utils/common/formatting";
import getKR from "@/utils/common/getKR";
import { useList } from "@/utils/hooks/useList";
import dayjs from "dayjs";
import { motion } from "framer-motion";

import Image from "next/image";
import { useRouter } from "next/router";
import styled from "styled-components";

interface ItemPropsType {
  time: string;
  code: string;
  side: "buy" | "sell" | "krw";
  total: number;
  amount?: number;
  index?: number;
  price?: number;
  id: string;
}

const AssetItem: React.FC<ItemPropsType> = ({
  time,
  code = "KRW",
  side = "krw",
  total,
  amount,
  price,
  id,
}) => {
  const { coinList } = useList();

  const BlurURL =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg==";

  const imageLink = `${process.env.NEXT_PUBLIC_LOGO_API_URL}${f(
    "code",
    code
  )}.png`;

  const router = useRouter();

  return (
    <Container
      initial={{ backgroundColor: "white" }}
      whileTap={{ backgroundColor: "#f2f4f6" }}
      onClick={() => {
        router.push(
          {
            pathname: `/wallet/trade/${id}`,
            query: { access: "true" },
          },
          `/wallet/trade/${id}`
        );
      }}
    >
      <CodeIcon>
        <Image
          src={imageLink}
          alt={"logo"}
          width={32}
          height={32}
          placeholder="blur"
          blurDataURL={BlurURL}
        />
      </CodeIcon>
      <InfoContainer>
        <TopContainer>
          <NameContainer>
            <p>{side !== "krw" ? getKR(coinList.data, code) : "원화"}</p>
          </NameContainer>
          <p style={{ textAlign: "right" }}>{f("fixedPrice", total)}원</p>
        </TopContainer>
        <BottomContainer>
          <StatusContainer>
            <BottomText>{dayjs(time).format("HH:mm")}</BottomText>
            <TypeText>
              |{" "}
              {side === "buy" ? "매수" : side === "sell" ? "매도" : "원화입금"}
            </TypeText>
          </StatusContainer>
          <StatusContainer>
            {side !== "krw" && (
              <BottomText>
                {f("orderbookSize", price, amount)} {f("code", code)}
              </BottomText>
            )}
          </StatusContainer>
        </BottomContainer>
      </InfoContainer>
    </Container>
  );
};

const Container = styled(motion.div)`
  display: flex;

  align-items: center;
  height: 65px;
  padding: 5px 20px 3px 20px;
  position: relative;
  cursor: pointer;
`;

const InfoContainer = styled.div`
  width: 100%;
  margin-left: 15px;
  display: flex;
  flex-direction: column;
`;

const TopContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  margin-bottom: 6px;
  width: 100%;
  white-space: nowrap;

  p {
    font-size: 16px;
    font-weight: 600;
    letter-spacing: -1px;
  }
`;

const NameContainer = styled.div`
  @media screen and (max-width: 320px) {
    max-width: 95px;
  }

  p {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    word-break: break-all;
  }
`;

const BottomContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;
`;

const CodeIcon = styled.div`
  width: 32px;
  height: 32px;
  min-width: 32px;
  background-color: #f2f4f6;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const StatusContainer = styled.div`
  display: flex;
`;

const BottomText = styled.p<{ color?: string | undefined }>`
  font-size: 13px;
  color: ${(props) => (props.color ? props.color : "gray")};

  letter-spacing: -0.5px;
`;

const PercentText = styled(BottomText)`
  letter-spacing: -0.5px;
  margin-left: 7px;
  font-weight: 600;
`;

const TypeText = styled(BottomText)`
  margin-left: 3px;
`;

export default AssetItem;
