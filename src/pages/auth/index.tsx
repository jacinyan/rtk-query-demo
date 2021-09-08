import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { useCreateSessionIdMutation } from "src/services/apiSlice";
import { setSessionId } from "./authSlice";
import { toast } from "react-toastify";

const Auth = () => {
  const location = useLocation();
  const history = useHistory();

  const dispatch = useDispatch();
  const [createSessionId] = useCreateSessionIdMutation();

  useEffect(() => {
    // Doc 3
    const requestToken = location.search?.split("&")[0].split("=")[1];
    const isPermitted = location.search?.split("&")[1];

    if (location.search && isPermitted === "approved=true") {
      createSessionId(requestToken)
        .unwrap()
        .then((data) => {
          const sessionId = data.session_id;

          dispatch(setSessionId(sessionId));
          localStorage.setItem("sessionId", sessionId);

          history.replace("/");
          toast.success("Login success");
        })
        .catch((error) => {
          console.dir(error);
        });
    } else if (location.search && isPermitted === "denied=true") {
      history.replace("/auth");
      toast.warning("Authentication denied");
    }
  }, [location, history, createSessionId, dispatch]);

  const handleAuth = async () => {
    if (
      window.confirm(`You'll be redirected to TMDB, do you agree to continue?`)
    ) {
      try {
        // Doc: Step 1
        const response = await fetch(
          `/authentication/token/new?api_key=${process.env.REACT_APP_API_KEY}`
        );
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        const { request_token: requestToken } = await response.json();

        // Doc: Step 2
        const { location } = window;
        const redirectUrl = location.href.split("?")[0];
        location.href = `https://www.themoviedb.org/authenticate/${requestToken}?redirect_to=${redirectUrl}`;
      } catch (error: any) {
        toast.error(error.message);
      }
    } else {
      toast.info("Redirection cancelled");
    }
  };

  return (
    <>
      <h1>Welcome to TMDB React Client</h1>
      <button onClick={handleAuth}>Start Login</button>
    </>
  );
};

export default Auth;
