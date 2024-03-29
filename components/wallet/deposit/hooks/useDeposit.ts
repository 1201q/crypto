import { getIsDataCreation, newDoc, updateTargetDoc } from "@/utils/common/db";

import { getAuth } from "firebase/auth";
import { arrayUnion } from "firebase/firestore";
import { useRouter } from "next/router";
import { useState } from "react";
import { FormEvent } from "react";
import { v4 as uuid_v4 } from "uuid";
import dayjs from "dayjs";

const useDeposit = (KRW: number) => {
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setErrorMsg("");
    setIsLoading(true);

    const uid = await getUid();

    if (!uid) {
      setErrorMsg("로그인 상태가 아닙니다. 로그인을 시도해주세요.");
      setIsLoading(false);
    } else {
      update(uid);
    }
  };

  const update = async (uid: string) => {
    const walletData = {
      uid: uid,
      balance: KRW,
    };

    const tradeData = {
      krw: arrayUnion({
        id: uuid_v4(),
        timestamp: dayjs().format(""),
        total: KRW,
        side: "krw",
      }),
    };

    if (KRW < 10000) {
      setErrorMsg("1만원 이상으로 설정해주세요.");
      setIsLoading(false);
      return;
    } else if (KRW > 100000000) {
      setErrorMsg("입금은 1억원까지만 가능해요.");
      setIsLoading(false);
      return;
    }

    const isWalletExist = await getIsDataCreation("wallet", uid);
    const isTradeExist = await getIsDataCreation("trade", uid);

    if (isWalletExist) {
      updateTargetDoc("wallet", uid, walletData, success);
    } else if (!isWalletExist) {
      newDoc("wallet", uid, walletData, success);
    }

    if (isTradeExist) {
      updateTargetDoc("trade", uid, tradeData, success);
    } else if (!isTradeExist) {
      newDoc("trade", uid, tradeData, success);
    }
    router.back();
  };

  const getUid = async () => {
    try {
      const user = getAuth().currentUser;
      return user?.uid;
    } catch (error) {
      return null;
    }
  };

  const success = () => {
    setErrorMsg("");
    setIsLoading(false);
  };

  return { onSubmit, errorMsg, isLoading };
};

export default useDeposit;
