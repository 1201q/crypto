import { getAuthErrorMsg } from "@/utils/common/auth";
import { authService } from "@/utils/firebase/client";
import { FirebaseError } from "firebase/app";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useRouter } from "next/router";
import { useState } from "react";
import { FormEvent } from "react";

const useSignup = (email: string, password: string, name: string) => {
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMsg("");
    setIsLoading(true);
    signUpEmail(email, password, name);
  };

  const signUpEmail = async (email: string, password: string, name: string) => {
    createUserWithEmailAndPassword(authService, email, password)
      .then(async (userObj) => {
        await updateProfile(userObj.user, { displayName: name });
        setIsLoading(false);

        await router.replace(router.asPath, undefined, { shallow: false });
      })
      .catch((error: FirebaseError) => {
        setIsLoading(false);
        setErrorMsg(getAuthErrorMsg(error.code));
      });
  };

  return { errorMsg, onSubmit, isLoading };
};
export default useSignup;
