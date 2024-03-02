import { getAuthErrorMsg } from "@/utils/common/auth";
import { authService } from "@/utils/firebase/client";
import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/router";
import { useState } from "react";
import { FormEvent } from "react";

const useLogin = (email: string, password: string) => {
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const loginData = {
      email: email,
      password: password,
    };
    setErrorMsg("");
    setIsLoading(true);
    signInEmailandPassword(loginData.email, loginData.password);
  };

  const signInEmailandPassword = async (email: string, password: string) => {
    signInWithEmailAndPassword(authService, email, password)
      .then(() => {
        setIsLoading(false);

        router.replace("/", undefined, { shallow: false });
      })
      .catch((error: FirebaseError) => {
        setErrorMsg(getAuthErrorMsg(error.code));
        setIsLoading(false);
      });
  };

  return { onSubmit, errorMsg, isLoading };
};

export default useLogin;
