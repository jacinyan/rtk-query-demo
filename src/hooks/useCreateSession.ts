import { useEffect } from "react";
import { setAuthInfo } from "src/features/auth/authSlice";
import { useCreateSessionIdMutation } from "src/services/apiSlice";
import { useToast } from "@chakra-ui/toast";
import { History, Location } from "history";
import { useAppDispatch } from "../store/hooks";
import { useAuth } from "./useAuth";

interface IRouteProps {
  history: History<unknown>;
  location: Location<unknown>;
}

export const useCreateSession = ({ history, location }: IRouteProps) => {
  const dispatch = useAppDispatch();

  const { sessionId } = useAuth();
  const [createSessionId] = useCreateSessionIdMutation();
  const toast = useToast();

  useEffect(() => {
    // Doc 3
    if (sessionId) {
      history.replace("/");
      return;
    }

    const requestToken = location.search?.split("&")[0].split("=")[1];
    const isPermitted = location.search?.split("&")[1];

    if (location.search && isPermitted === "approved=true") {
      (async () => {
        try {
          const respSession = await createSessionId(requestToken).unwrap();
          const { session_id: sessionId } = respSession;

          const respAccount = await fetch(
            process.env.REACT_APP_BASE_API +
              `/account?api_key=${process.env.REACT_APP_API_KEY}&session_id=${sessionId}`
          );
          if (!respAccount.ok) {
            throw new Error(respAccount.statusText);
          }

          const { id: accountId } = await respAccount.json();
          dispatch(setAuthInfo({ accountId, sessionId }));
          localStorage.setItem(
            "__TMDB_AUTHINFO__",
            JSON.stringify({ accountId, sessionId })
          );

          history.replace("/");
          toast({
            title: "Login success",
            description: "You can start playing around in here! Enjoy",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
        } catch (error) {
          console.warn(error);
        }
      })();
    } else if (location.search && isPermitted === "denied=true") {
      history.replace("/auth");
      toast({
        title: "Authentication denied",
        description: "You can retry by pressing the button",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
    }
  }, [location, history, createSessionId, dispatch, toast, sessionId]);
};
