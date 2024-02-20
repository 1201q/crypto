import type { AppProps } from "next/app";
import { AuthProvider } from "@/utils/firebase/provider";
import "@/utils/firebase/client";
import { ThemeProvider } from "styled-components";
import { theme } from "@/styles/theme";
import { admin } from "@/utils/firebase/admin";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { SWRConfig, SWRConfiguration } from "swr";
import { DevTools } from "jotai-devtools";

import fetcher from "@/utils/common/fetcher";
import GlobalStyles from "@/styles/globals";

export default function App({ Component, pageProps }: AppProps) {
  const { fallback } = pageProps;

  const options: SWRConfiguration = {
    fallback: fallback || {},
    fetcher: fetcher,
  };

  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <SpeedInsights />
        <SWRConfig value={options}>
          <DevTools />
          <GlobalStyles />
          <Component {...pageProps} />
        </SWRConfig>
      </AuthProvider>
    </ThemeProvider>
  );
}
