import { doc, getDoc, setDoc, onSnapshot } from "firebase/firestore";
import { dbService } from "../firebase/client";

interface WalletType {
  uid: string;
}

// user가 wallet이 생성되었는지 반환  없다면 false를 반환
export const getIsWalletCreation = async (uid: string): Promise<boolean> => {
  try {
    const docRef = doc(dbService, "wallet", uid);
    const docSnap = await getDoc(docRef);
    const hasWallet = docSnap.exists();
    return hasWallet;
  } catch (error) {
    throw error;
  }
};

export const newWallet = async (uid: string, seedMoney: number) => {
  const initData = {
    uid: uid,
    money: seedMoney,
  };

  const walletRef = doc(dbService, "wallet", uid);

  try {
    await setDoc(walletRef, initData);
    console.log(`Wallet for UID ${uid} created successfully.`);
  } catch (error) {
    console.log(`실패`, error);
  }
};

export const observeWalletData = async (uid: string) => {
  const walletRef = doc(dbService, "wallet", uid);
  let latestData: WalletType | null = null;

  const unsubscribe = onSnapshot(walletRef, (snapshot) => {
    if (snapshot.exists()) {
      const newData = snapshot.data() as WalletType;
      latestData = newData;
    }
  });

  return {
    getLatestData: () => {
      return latestData;
    },
    stopListening: unsubscribe,
  };
};

export const newDoc = async (
  collectionName: string,
  docName: string,
  initData: any
) => {
  const dataRef = doc(dbService, collectionName, docName);

  try {
    await setDoc(dataRef, initData);
    console.log(`Wallet for UID ${docName} created successfully.`);
  } catch (error) {
    console.log(`실패`, error);
  }
};

export const observeDataChanges = async (
  collectionName: string,
  docName: string
) => {
  const dataRef = doc(dbService, collectionName, docName);
  let latestData: any = null;

  const unsubscribe = onSnapshot(dataRef, (snapshot) => {
    if (snapshot.exists()) {
      const newData = snapshot.data() as any;
      latestData = newData;
    }
  });

  return {
    getLatestData: () => {
      return latestData;
    },
    stopListening: unsubscribe,
  };
};
