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
  initData: T,
  callback: () => void
): Promise<void> => {
  const dataRef = doc(dbService, collectionName, docName);

  try {
    await setDoc(dataRef, initData);
    callback();
  } catch (error) {
    console.log(`실패`, error);
  }
};

export const updateTargetDoc = async <T extends WithFieldValue<DocumentData>>(
  collectionName: string,
  docName: string,
  data: T,
  callback: () => void
): Promise<void> => {
  const dataRef = doc(dbService, collectionName, docName);

  try {
    await updateDoc(dataRef, data);
    callback();
  } catch (error) {
    console.log(`실패`, error);
  }
};

export const observeDataChanges = async <T>(
  collectionName: string,
  docName: string,
  callback: (data: T) => void
) => {
  const dataRef = doc(dbService, collectionName, docName);

  const unsubscribe = onSnapshot(dataRef, (snapshot) => {
    if (snapshot.exists()) {
      const newData = snapshot.data() as T;
      if (callback) callback(newData);
    }
  });

  return unsubscribe;
};
