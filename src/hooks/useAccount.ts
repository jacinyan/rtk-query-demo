import { useMemo } from "react";
import { useGetAccountQuery } from "src/services/apiSlice";
import { useAuth } from "./useAuth";

export interface IGetAccountResponse {
  avatar: object;
  id: number;
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  include_adult: boolean;
  username: string;
}

export const useAccount = () => {
  const sessionId = useAuth();

  const { data } = useGetAccountQuery(sessionId);

  return useMemo(() => data, [data]);
};
