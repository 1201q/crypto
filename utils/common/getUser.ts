import { admin } from "../firebase/admin";

// 무조건 export default로 내보낼것!!
// #ef58c8d 커밋처럼 오류남

export default async function getUser(token: string) {
  let isLogin = false;
  let uid = null;

  try {
    const mytoken = await admin.auth().verifyIdToken(token);

    if (mytoken) {
      isLogin = true;
      uid = mytoken.uid;
      console.log("로그인상태");
    }
  } catch (error: any) {
    console.log(error.code);
  }

  return { isLogin: isLogin, uid: uid };
}
