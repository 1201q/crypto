import f from "@/utils/common/formatting";
import getKR from "@/utils/common/getKR";
import { useList } from "@/utils/hooks/useList";
import Image from "next/image";
import React from "react";
import styled from "styled-components";

interface InfoProps {
  name?: string;
  code: string;
}

const CoinInfo: React.FC<InfoProps> = ({ code, name }) => {
  const { coinList } = useList();
  const BlurURL =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg==";

  return (
    <Container>
      <CodeIcon>
        <Image
          src={`${process.env.NEXT_PUBLIC_LOGO_API_URL}${f("code", code)}.png`}
          alt={"logo"}
          width={23}
          height={23}
          placeholder="blur"
          blurDataURL={BlurURL}
        />
      </CodeIcon>
      <NameContainer>
        <KRnameText>{name ? name : getKR(coinList.data, code)}</KRnameText>
        <CodeText>{f("code", code)}</CodeText>
      </NameContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
`;

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

const CodeIcon = styled.div`
  width: 36px;
  height: 36px;
  background-color: #f2f4f6;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

// text
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

export default React.memo(CoinInfo);
