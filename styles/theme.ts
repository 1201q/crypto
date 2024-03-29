const height = {
  header: 50,
  bottomTab: 50,
  marketListController: 50,
  orderbookHeader: 50,
  tradeListHeadar: 45,
  orderBottomTab: 55,
  orderPageOrderbookController: 40,
};

const calculatedHeight = {
  marketList: `calc(100% - ${
    height.header + height.bottomTab + height.marketListController
  }px)`,
  tradeList: `calc(100% - ${height.header + height.tradeListHeadar}px)`,
  orderbookList: `calc(100% - ${height.header + height.orderbookHeader}px)`,
  orderpage: `calc(100dvh - ${height.header}px)`,
  walletTradeList: `calc(100dvh - ${
    height.header + height.tradeListHeadar + height.bottomTab
  }px)`,
};

export const theme = {
  font: {
    red: "#df5068",
    blue: "#448aef",
    darkgray: "#6b7684",
    black: "#171717",
    gray: "#b7bfc7",
  },
  bg: {
    default: "#f2f4f6",
    selectBtn: "#565656",
    red: "#df5068",
    blue: "#448aef",
    gray: "#b1b1b1",
    lightBlue: "#ebf3fd",
    lightRed: "#fff3f3",
    darkRed: "#85303E",
    darkBlue: "#28528F",
    modalBg: "rgba(0, 0, 0, 0.7)",
  },
  height: { ...height, ...calculatedHeight },
};
