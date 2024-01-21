import { admin } from "../firebase/admin";

export default async function getServersideAuth(token: string) {
  let isLogin = false;
  let uid = null;
  if (token) {
    const mytoken = await admin.auth().verifyIdToken(token);

    if (mytoken) {
      isLogin = true;
      uid = mytoken.uid;
    }
  }

  return { isLogin: isLogin, uid: uid };
}
