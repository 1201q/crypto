import { doc, getDoc } from "firebase/firestore";
import { dbService } from "../firebase/client";

// user가 처음로그인하는 경우 true를 반환, 아닐경우 false반환
export const getIsFirstLogin = async (uid: string): Promise<boolean> => {
  try {
    const docRef = doc(dbService, "user", uid);
    const docSnap = await getDoc(docRef);
    const isFirstLogin = !docSnap.exists();
    return isFirstLogin;
  } catch (error) {
    throw error;
  }
};
