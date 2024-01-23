import Head from "next/head";
import React from "react";

interface MetaProps {
  title?: string;
  description?: string;
}

const HeadMeta: React.FC<MetaProps> = ({ title, description }) => {
  return (
    <Head>
      <title>{title || "ALL UP!"}</title>
      <meta
        name="description"
        content={
          description ||
          "모두가 즐겁게 즐기는 가상자산 시뮬레이터, ALL UP!입니다."
        }
      />
    </Head>
  );
};
export default HeadMeta;
