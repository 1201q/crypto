import styled from "styled-components";
import React, { useEffect, useRef, useState } from "react";
import { motion, useAnimation } from "framer-motion";

import { useAtom } from "jotai";
import {
  headerHeightAtom,
  coinListControllerHeightAtom,
} from "@/context/styles";
import { sortOptionAtom } from "@/context/atoms";

import Image from "next/image";
import Search from "@/public/search.svg";
import { useRouter } from "next/router";

const MarketHeader = () => {
  const router = useRouter();
  const isRenderedRef = useRef(null);
  const [headerHeight] = useAtom(headerHeightAtom);
  const [sortOptions, setSortOptions] = useAtom(sortOptionAtom);
  const [listHeight] = useAtom(coinListControllerHeightAtom);

  const animation = useAnimation();

  useEffect(() => {
    if (isRenderedRef.current) {
      let prevY = window.scrollY;

      const handleScroll = () => {
        const currentY = window.scrollY;

        if (prevY === currentY) {
          handleAnimation(0);
        } else if (prevY > currentY) {
          handleAnimation(0);
        } else if (prevY < currentY) {
          if (currentY > 50) {
            handleAnimation(-50);
          }
        }
        prevY = currentY;
      };

      window.addEventListener("scroll", handleScroll);

      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, [isRenderedRef.current]);

  const scrollToTop = () => {
    const element = document.body;
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  };

  const handleAnimation = (y: number) => {
    if (animation) {
      animation.start({
        y: y,
        transition: { duration: 0 },
      });
    }
  };

  return (
    <Container animate={animation} ref={isRenderedRef}>
      <HeaderContainer height={headerHeight}>
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

const Container = styled(motion.header)`
  position: sticky;
  top: 0;
  z-index: 100;
`;

const HeaderContainer = styled(motion.div)<{ height: number }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: ${(props) => `${props.height}px`};
  background-color: white;
  padding: 0px 20px;
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
