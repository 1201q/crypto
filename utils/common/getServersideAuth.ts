import { admin } from "../firebase/admin";

export default async function getServersideAuth(token: string) {
  let isLogin = false;
  let uid = null;

  try {
    const mytoken = await admin.auth().verifyIdToken(token);

    if (mytoken) {
      isLogin = true;
      uid = mytoken.uid;
    }
  } catch (error: any) {
    console.log(error.code);
  }

  return { isLogin: isLogin, uid: uid };
}
