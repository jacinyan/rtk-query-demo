import { useMemo } from "react";
import { selectAuthInfo } from "src/features/auth/authSlice";
import { useAppSelector } from "../store/hooks";

export const useAuth = () => {
  const authInfo = useAppSelector(selectAuthInfo);

  return useMemo(() => authInfo, [authInfo]);
};
