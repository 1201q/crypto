import { authService } from "@/utils/firebase/client";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useRouter } from "next/router";

const useGoogle = () => {
  const router = useRouter();
  const provider = new GoogleAuthProvider();

  const loginGoogle = async (): Promise<void> => {
    signInWithPopup(authService, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        // const token = credential?.accessToken;
        // const user = result;

        router.replace("/market");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return { loginGoogle: loginGoogle };
};

export { useGoogle };
