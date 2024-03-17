import { orderDataAtom } from "@/context/order";
import { useAtomValue } from "jotai";
import { getIsDataCreation, newDoc, updateTargetDoc } from "@/utils/common/db";

import { getAuth } from "firebase/auth";
import { arrayUnion } from "firebase/firestore";
import { useRouter } from "next/router";
import { useState } from "react";
import { FormEvent } from "react";
import { v4 as uuid_v4 } from "uuid";
import dayjs from "dayjs";

const useOrder = () => {
  const router = useRouter();
  const data = useAtomValue(orderDataAtom);

  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    setErrorMsg("");
    setIsLoading(true);

    const uid = await getUid();

    if (!uid) {
      setErrorMsg("로그인 상태가 아닙니다. 로그인을 시도해주세요.");
      setIsLoading(false);
    } else {
      order(uid);
    }
  };

  const order = async (uid: string) => {
    const orderData = {
      trade: arrayUnion({
        ...data,
        amount: data.total / data.price,
        id: uuid_v4(),
        timestamp: dayjs().format(""),
      }),
    };

    const isTradeExist = await getIsDataCreation("trade", uid);

    if (isTradeExist) {
      updateTargetDoc("trade", uid, orderData, success);
    } else if (!isTradeExist) {
      newDoc("trade", uid, orderData, success);
    }
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
    setIsLoading(false);
    setErrorMsg("");
    router.back();
  };

  return { onClick, errorMsg, isLoading };
};

export default useOrder;
