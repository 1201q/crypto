import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  onSnapshot,
  WithFieldValue,
  DocumentData,
} from "firebase/firestore";
import { dbService } from "../firebase/client";

// data가 존재하는지
export const getIsDataCreation = async (
  collectionName: string,
  docName: string
): Promise<boolean> => {
  try {
    const docRef = doc(dbService, collectionName, docName);
    const docSnap = await getDoc(docRef);
    const hasData = docSnap.exists();
    return hasData;
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

export const updateTargetDoc = async <T extends WithFieldValue<DocumentData>>(
  collectionName: string,
  docName: string,
  data: T
): Promise<void> => {
  const dataRef = doc(dbService, collectionName, docName);

  try {
    await updateDoc(dataRef, data);
    console.log("성공");
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
