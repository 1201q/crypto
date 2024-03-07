import {
  doc,
  getDoc,
  setDoc,
  onSnapshot,
  WithFieldValue,
  DocumentData,
} from "firebase/firestore";
import { dbService } from "../firebase/client";

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

export const newDoc = async <T extends WithFieldValue<DocumentData>>(
  collectionName: string,
  docName: string,
  initData: T
): Promise<void> => {
  const dataRef = doc(dbService, collectionName, docName);

  try {
    await setDoc(dataRef, initData);
    console.log(`Wallet for UID ${docName} created successfully.`);
  } catch (error) {
    console.log(`실패`, error);
  }
};

export const observeDataChanges = async <T>(
  collectionName: string,
  docName: string
) => {
  const dataRef = doc(dbService, collectionName, docName);
  let latestData: T | null = null;

  const unsubscribe = onSnapshot(dataRef, (snapshot) => {
    if (snapshot.exists()) {
      const newData = snapshot.data() as T;
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
