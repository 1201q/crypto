import { IconExchange } from "@/public/svgs";
import styled from "styled-components";
import MyAssetItem from "./MyAssetRow";
import { useSetAtom, useAtomValue } from "jotai";
import {
  isSelectOptionModalOpen,
  selectAssetSortOption,
} from "@/context/atoms";
import { useRouter } from "next/router";

const MyAssetList = () => {
  const router = useRouter();
  const openOptionModal = useSetAtom(isSelectOptionModalOpen);
  const selectOption = useAtomValue(selectAssetSortOption);

  return (
    <Container>
      <SortHeader
        onClick={() => {
          openOptionModal(true);
          router.push(
            {
              pathname: router.pathname,
              query: { ...router.query, open: true },
            },
            `${router.asPath}?`,
            { shallow: true }
          );
        }}
      >
        <p>{selectOption?.name}</p>
        <IconExchange width={13} height={13} />
      </SortHeader>
      <ListContainer>
        <MyAssetItem /> <MyAssetItem /> <MyAssetItem /> <MyAssetItem />{" "}
        <MyAssetItem /> <MyAssetItem /> <MyAssetItem /> <MyAssetItem />
      </ListContainer>
    </Container>
  );
};

const Container = styled.div`
  height: 100%;
`;

const SortHeader = styled.div`
  position: sticky;
  top: 50px;
  display: flex;
  align-items: center;
  justify-content: flex-start;

  cursor: pointer;
  height: 45px;
  padding: 0px 20px;
  background-color: white;
  border-bottom: 1px solid #f1f2f2;
  z-index: 2;

  p {
    font-size: 15px;
    font-weight: 500;
    color: ${(props) => props.theme.font.darkgray};
    margin-right: 6px;
  }

  svg {
    fill: ${(props) => props.theme.font.darkgray};
    margin-top: 1px;
  }
`;

const ListContainer = styled.div`
  /* padding-top: 10px; */
`;
export default MyAssetList;
