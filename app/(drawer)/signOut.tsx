import { router } from "expo-router";
import { useAuthDispatch } from "@/context/AuthContext";
import { useProfileDispatch } from "@/context/ProfileContext";
import { useEffect } from "react";

export default function signOut() {
  const authDispatch = useAuthDispatch()!;
  const profileDispatch = useProfileDispatch()!;

  useEffect(() => {
    authDispatch({ type: "signOut" });
    profileDispatch({ type: "signOut" });
    router.navigate("/");
  }, []);

  return <></>;
}
