import styled from "styled-components";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useAtom } from "jotai";
import { sortOptionAtom } from "@/context/atoms";

import Image from "next/image";
import Search from "@/public/search.svg";
import { useRouter } from "next/router";
import { throttle } from "lodash";

const MarketHeader = () => {
  const router = useRouter();
  const beforeScrollY = useRef(0);

  const [sortOptions, setSortOptions] = useAtom(sortOptionAtom);
  const [isScrolled, setIsScrolled] = useState(true);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      setIsScrolled(true);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    const element = document.body;
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  };

  const handleScroll = throttle(() => {
    const scrollY = window.scrollY;
    const mobileScrollThreshold = 15;

    const diff = Math.abs(scrollY - beforeScrollY.current);

    if (diff > mobileScrollThreshold) {
      if (scrollY > beforeScrollY.current) {
        setIsScrolled(false);
      } else {
        setIsScrolled(true);
      }

      beforeScrollY.current = scrollY;
    }
  }, 50);

  return (
    <Container isScrolled={isScrolled}>
      <HeaderContainer>
        <Title onClick={scrollToTop}>
          <Image
            src={require("@/public/logo.png")}
            alt={"logo"}
            width={32}
            height={28}
            style={{ marginLeft: "4px" }}
          />
        </Title>
        <Search
          width={23}
          height={23}
          fill={"#b7bfc7"}
          style={{ cursor: "pointer", marginTop: "3px" }}
          onClick={() => {
            router.push("/search");
          }}
        />
      </HeaderContainer>
      <ControllContainer>
        {sortOptions.map((option, index) => (
          <SortBtn
            onClick={() => {
              setSortOptions((prev) => {
                return prev.map((o, oi) => ({
                  ...o,
                  select: oi === index,
                }));
              });
            }}
            key={option.name}
            $isselect={option.select}
            initial={{ scale: 1 }}
            whileTap={{ scale: 0.95 }}
          >
            {option.name}
          </SortBtn>
        ))}
      </ControllContainer>
    </Container>
  );
};

const Container = styled.header<{ isScrolled: boolean }>`
  position: sticky;
  top: 0;
  z-index: 100;
  transform: ${(props) =>
    props.isScrolled ? `translateY(0px)` : `translateY(-50px)`};
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
