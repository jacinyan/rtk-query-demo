import { selectSessionId } from "src/features/auth/authSlice";
import { useAppSelector } from "./rtk";

export const useAuth = () => {
  const sessionId = useAppSelector(selectSessionId);

  return sessionId;
};
