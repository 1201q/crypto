import { admin } from "../firebase/admin";

export default async function getServersideAuth(token: string) {
  const mytoken = await admin.auth().verifyIdToken(token);

  if (mytoken) {
    return { myuid: mytoken.uid };
  } else {
    return { myuid: null };
  }
}
