import styled from "styled-components";
import { useEffect } from "react";
import { throttle } from "lodash";
import { motion, useAnimation } from "framer-motion";

import { useAtom } from "jotai";
import {
  headerHeightAtom,
  coinListControllerHeightAtom,
} from "@/context/styles";
import { sortOptionAtom } from "@/context/atoms";

import Image from "next/image";
import Search from "@/public/search.svg";

const Header = () => {
  const [headerHeight] = useAtom(headerHeightAtom);
  const [sortOptions, setSortOptions] = useAtom(sortOptionAtom);
  const [listHeight] = useAtom(coinListControllerHeightAtom);

  const animation = useAnimation();

  useEffect(() => {
    let prevY = window.scrollY;

    const handleScroll = throttle(() => {
      const currentY = window.scrollY;

      if (prevY > currentY) {
        animation.start({ y: 0 });
      } else {
        animation.start({ y: -50 });
      }
      prevY = currentY;
    }, 150);

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Container animate={animation} transition={{ duration: 0.15 }}>
      <HeaderContainer height={headerHeight}>
        <Title>
          <Image
            src={require("@/public/logo.png")}
            alt={"logo"}
            width={36}
            height={25}
          />
        </Title>
        <Search
          width={23}
          height={23}
          fill={"#b7bfc7"}
          style={{ cursor: "pointer", marginTop: "3px" }}
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

export default Header;
