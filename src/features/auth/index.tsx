import { Button } from "@chakra-ui/button";
import { Box, Center, VStack } from "@chakra-ui/layout";
import { useLocation, useHistory } from "react-router-dom";
import { useCreateSession } from "src/hooks/useCreateSession";
import { useToast } from "@chakra-ui/toast";
import { useCallback } from "react";

const Auth = () => {
  const location = useLocation();
  const history = useHistory();
  const toast = useToast();

  useCreateSession({ location, history });

  const handleRedirect = useCallback(async () => {
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
        toast({
          title: "Error encountered",
          description: error,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } else {
      toast({
        title: "Redirection cancelled",
        description: "You can retry by pressing the button",
        status: "info",
        duration: 5000,
        isClosable: true,
      });
    }
  }, [toast]);

  return (
    <Center h="400px">
      <VStack>
        <Box as={"h1"}>Welcome to TM Database React Client</Box>
        <Button onClick={handleRedirect}>Start Login</Button>
      </VStack>
    </Center>
  );
};

export default Auth;
