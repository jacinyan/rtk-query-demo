import { useMemo } from "react";
import { selectSessionId } from "src/pages/auth/authSlice";
import { useAppSelector } from "./rtkq";

export const useAuth = () => {
  const sessionId = useAppSelector(selectSessionId);

  return useMemo(() => sessionId, [sessionId]);
};
