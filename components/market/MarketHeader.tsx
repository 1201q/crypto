import styled, { keyframes, css } from "styled-components";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useAtom } from "jotai";
import {
  headerHeightAtom,
  coinListControllerHeightAtom,
} from "@/context/styles";
import { sortOptionAtom } from "@/context/atoms";

import Image from "next/image";
import Search from "@/public/search.svg";
import { useRouter } from "next/router";
import { throttle } from "lodash";

const MarketHeader = () => {
  const router = useRouter();
  const beforeScrollY = useRef(0);

  const [headerHeight, setHeaderHeight] = useAtom(headerHeightAtom);
  const [sortOptions, setSortOptions] = useAtom(sortOptionAtom);
  const [listHeight] = useAtom(coinListControllerHeightAtom);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      setHeaderHeight(50);
      setIsVisible(true);
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
        setIsVisible(false);
        setHeaderHeight(0);
      } else {
        setIsVisible(true);
        setHeaderHeight(50);
      }

      beforeScrollY.current = scrollY;
    }
  }, 50);

  return (
    <Container>
      <HeaderContainer isvisible={isVisible} height={headerHeight}>
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
      <ListContainer height={listHeight}>
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
      </ListContainer>
    </Container>
  );
};

const Container = styled.header`
  position: sticky;
  top: 0;
  z-index: 100;
`;

const HeaderContainer = styled.div<{
  height: number;
  isvisible: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: ${(props) => `${props.height}px`};
  background-color: white;
  padding: 0px 20px;
  display: ${(props) => (props.isvisible ? "" : "none")};
`;

const Title = styled.div`
  display: flex;
  margin-top: 5px;
  margin-left: -5px;
  cursor: pointer;
`;

const ListContainer = styled(motion.div)<{ height: number }>`
  display: flex;
  align-items: center;
  padding: 0px 20px;
  height: ${(props) => `${props.height}px`};
  background-color: white;
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
