import type { AppProps } from "next/app";
import "@/styles/reset.css";
import { AuthProvider } from "@/utils/firebase/provider";
import "@/utils/firebase/client";
import { ThemeProvider } from "styled-components";
import { theme } from "@/styles/theme";
import { admin } from "@/utils/firebase/admin";
import { SpeedInsights } from "@vercel/speed-insights/next";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <SpeedInsights />
        <Component {...pageProps} />
      </AuthProvider>
    </ThemeProvider>
  );
}
