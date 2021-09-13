import { useMemo } from "react";
import { selectAuthInfo } from "src/features/auth/authSlice";
import { useGetTVShowWatchListQuery } from "src/services/apiSlice";
import { useAppSelector } from "src/store/hooks";

export const useTVShowWatchList = () => {
  const { sessionId, accountId } = useAppSelector(selectAuthInfo);

  const { data } = useGetTVShowWatchListQuery({
    sessionId: sessionId && sessionId,
    accountId: accountId && accountId,
  });

  return useMemo(() => {
    const results = data ? data.results : [];

    return { results, sessionId, accountId };
  }, [data, sessionId, accountId]);
};
