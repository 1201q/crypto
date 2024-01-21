import { admin } from "../firebase/admin";

export default async function getServersideAuth(token: string) {
  const mytoken = await admin.auth().verifyIdToken(token);

  if (mytoken) {
    return { isLogin: true, uid: mytoken.uid };
  } else {
    return { isLogin: false, uid: null };
  }
}
