import { isGoogleLoginLoadingAtom } from "@/context/user";
import { authService } from "@/utils/firebase/client";
import {
  GoogleAuthProvider,
  signInWithRedirect,
  getRedirectResult,
} from "firebase/auth";
import { useAtom } from "jotai";

import { useRouter } from "next/router";
import { useEffect } from "react";

const useGoogle = () => {
  const router = useRouter();

  const provider = new GoogleAuthProvider();
  const [isLoading, setIsLoading] = useAtom(isGoogleLoginLoadingAtom);
  const loginGoogle = async (): Promise<void> => {
    setIsLoading(true);
    signInWithRedirect(authService, provider);
  };

  useEffect(() => {
    const handleRedirect = async () => {
      try {
        const result = await getRedirectResult(authService);
        if (result) {
          const credential = GoogleAuthProvider.credentialFromResult(result);
          setIsLoading(false);
          router.replace("/market", undefined, { shallow: true });
        } else {
          setIsLoading(false);
        }
      } catch (error) {}
    };
    handleRedirect();
  }, []);

  return {
    loginGoogle: loginGoogle,
    isGoogleLoading: isLoading,
  };
};

export { useGoogle };
