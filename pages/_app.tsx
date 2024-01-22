import type { AppProps } from "next/app";
import "@/styles/reset.css";
import { AuthProvider } from "@/utils/firebase/provider";
import "@/utils/firebase/client";
import { ThemeProvider } from "styled-components";
import { theme } from "@/styles/theme";
import { admin } from "@/utils/firebase/admin";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { SWRConfig, SWRConfiguration } from "swr";

import fetcher from "@/utils/common/fetcher";

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
          <Component {...pageProps} />
        </SWRConfig>
      </AuthProvider>
    </ThemeProvider>
  );
}
