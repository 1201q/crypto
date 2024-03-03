import styled from "styled-components";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useAtom } from "jotai";
import { sortOptionAtom } from "@/context/atoms";

import Image from "next/image";
import { IconSearch, IconUser } from "@/public/svgs";
import { useRouter } from "next/router";
import useScrollTop from "./hooks/useScrollTop";
import useScrollDirection from "./hooks/useScrollDirection";
import { isLoginAtom } from "@/context/user";
import { signOut } from "firebase/auth";
import { authService } from "@/utils/firebase/client";

interface PropsType {
  scrollY: number;
}

const MarketHeader: React.FC<PropsType> = () => {
  const router = useRouter();
  const [sortOptions, setSortOptions] = useAtom(sortOptionAtom);
  const [isVisible, setIsVisible] = useState(true);
  const [isLogin, setIsLogin] = useAtom(isLoginAtom);

  const { scrollToTop } = useScrollTop();
  useScrollDirection(setIsVisible);

  return (
    <Container isVisible={isVisible}>
      <HeaderContainer>
        <Title onClick={scrollToTop}>
          <Image
            src={require("@/public/logo.png")}
            alt={"logo"}
            width={32}
            height={28}
            style={{ marginLeft: "4px", marginBottom: "2px" }}
          />
        </Title>
        <RightContainer>
          {isLogin && (
            <button
              onClick={() => {
                signOut(authService)
                  .then(() => {
                    router.reload();
                  })
                  .catch((err) => console.log(err));
              }}
            >
              테스트
            </button>
          )}
          <IconSearch
            width={23}
            height={23}
            fill={"#b7bfc7"}
            style={{ cursor: "pointer", marginTop: "3px" }}
            onClick={() => {
              router.push("/search");
            }}
          />
          {!isLogin && (
            <User onClick={() => router.push("/auth")}>
              <IconUser width={20} height={20} fill={"white"} />
            </User>
          )}
        </RightContainer>
      </HeaderContainer>
      <ControllContainer>
        {sortOptions.map((option, index) => (
          <SortBtn
            onClick={() => {
              setSortOptions(index);
            }}
            key={option.name}
            $isselect={option.select}
          >
            {option.name}
          </SortBtn>
        ))}
      </ControllContainer>
    </Container>
  );
};

const Container = styled.header<{ isVisible: boolean }>`
  position: sticky;
  top: 0;
  z-index: 100;
  transform: ${(props) =>
    props.isVisible ? `translateY(0px)` : `translateY(-50px)`};
`;

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: ${(props) => `${props.theme.height.header}px`};
  background-color: white;
  padding: 0px 20px;
  border: none;
`;

const RightContainer = styled.div`
  display: flex;
  align-items: center;
`;

const User = styled.div`
  width: 26px;
  height: 26px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #b7bfc7;
  border-radius: 50%;
  margin-top: 3px;
  margin-left: 20px;
  overflow: hidden;
  cursor: pointer;
  svg {
    margin-top: 6px;
  }
`;

const Title = styled.div`
  display: flex;
  margin-top: 5px;
  margin-left: -5px;
  cursor: pointer;
`;

const ControllContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 0px 20px;
  height: ${(props) => `${props.theme.height.marketListController}px`};
  background-color: white;
  border: none;
`;

const SortBtn = styled(motion.button)<{ $isselect: boolean }>`
  height: 32px;
  border: none;
  margin-right: 10px;
  padding: 0px 10px;
  border-radius: 6px;
  cursor: pointer;
  color: ${(props) => (props.$isselect ? "white" : "#6b7684")};
  background-color: ${(props) => (props.$isselect ? "#565656" : "#f2f4f6")};
  font-weight: ${(props) => (props.$isselect ? 700 : 500)};
`;

export default React.memo(MarketHeader);
