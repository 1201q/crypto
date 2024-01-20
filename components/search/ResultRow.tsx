import f from "@/utils/common/formatting";
import { motion } from "framer-motion";
import Image from "next/image";
import styled from "styled-components";

interface RowProps {
  market: string;
  KRname: string;
}

const ResultRow: React.FC<RowProps> = ({ market, KRname }) => {
  return (
    <Row
      initial={{ scale: 1, backgroundColor: "white" }}
      whileTap={{ scale: 0.99, backgroundColor: "#F9FAFB" }}
    >
      <CodeIcon>
        <Image
          src={`https://static.upbit.com/logos/${f("code", market)}.png`}
          alt={"logo"}
          width={23}
          height={23}
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg=="
        />
      </CodeIcon>
      <NameContainer>
        <KRnameText>{KRname}</KRnameText>
        <CodeText>{f("code", market)}</CodeText>
      </NameContainer>
    </Row>
  );
};

const NameContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  margin-left: 15px;
  white-space: break-spaces;

  @media screen and (max-width: 320px) {
    width: 95px;
  }
`;
const Row = styled(motion.div)`
  display: flex;
  height: 47px;
  padding: 5px 20px 3px 20px;
  align-items: center;
  cursor: pointer;
  border-radius: 5px;
  background-color: white;
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
const KRnameText = styled.div`
  font-size: 16px;
  font-weight: 600;
  letter-spacing: -1px;
  margin-bottom: 6px;
`;

const CodeText = styled.div`
  font-size: 12px;
  color: gray;
  margin-left: 1px;
`;

export default ResultRow;
