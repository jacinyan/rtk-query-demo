import { useEffect } from "react";
import { setSessionId } from "src/pages/auth/authSlice";
import { useCreateSessionIdMutation } from "src/services/apiSlice";
import { useToast } from "@chakra-ui/toast";
import { History, Location } from "history";
import { useAppDispatch } from "./rtkq";
import { useAuth } from "./useAuth";

interface ISession {
  history: History<unknown>;
  location: Location<unknown>;
}

export const useCreateSession = ({ history, location }: ISession) => {
  const dispatch = useAppDispatch();
  const [createSessionId] = useCreateSessionIdMutation();
  const sessionId = useAuth();
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
          const response = await createSessionId(requestToken).unwrap();
          const session_id = response.session_id;

          dispatch(setSessionId(session_id));
          localStorage.setItem("sessionId", session_id);

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
  }, [location, history, createSessionId, dispatch, sessionId, toast]);
};
