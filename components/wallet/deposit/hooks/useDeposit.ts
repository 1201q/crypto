import { getIsDataCreation, newDoc, updateTargetDoc } from "@/utils/common/db";
import { getAuth } from "firebase/auth";
import { useRouter } from "next/router";
import { useState } from "react";
import { FormEvent } from "react";

const useDeposit = (KRW: number) => {
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setErrorMsg("");
    setIsLoading(true);
    update();
  };

  const update = async () => {
    const uid = await getUid();

    if (!uid) {
      setErrorMsg("로그인 상태가 아닙니다. 로그인을 시도해주세요.");
      setIsLoading(false);
      return;
    }

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
      updateTargetDoc("wallet", uid, {
        uid: uid,
        balance: KRW,
      });
    } else if (!isWalletExist) {
      newDoc("wallet", uid, {
        uid: uid,
        balance: KRW,
      });
    }

    if (isTradeExist) {
      updateTargetDoc("trade", uid, {
        uid: uid,
        balance: KRW,
      });
    } else if (!isTradeExist) {
      newDoc("trade", uid, {
        uid: uid,
        balance: KRW,
      });
    }

    setErrorMsg("");
    setIsLoading(false);
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

  return { onSubmit, errorMsg, isLoading };
};

export default useDeposit;
