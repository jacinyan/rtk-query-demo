import { useMemo } from "react";
import { useGetTVShowWatchListQuery } from "src/services/apiSlice";
import { useAccount } from "./useAccount";
import { useAuth } from "./useAuth";

export const useTVShowWatchList = () => {
  const sessionId = useAuth();
  const dataAccount = useAccount();
  const accountId = dataAccount && dataAccount.id;

  const { data } = useGetTVShowWatchListQuery({
    sessionId,
    accountId: accountId && accountId,
  });

  return useMemo(() => {
    const results = data ? data.results : [];

    return { results, sessionId, accountId };
  }, [data, sessionId, accountId]);
};
