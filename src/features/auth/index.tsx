import { Button } from "@chakra-ui/button";
import { Box, Center, VStack } from "@chakra-ui/layout";
import { useDisclosure } from "@chakra-ui/react";
import { useLocation, useHistory } from "react-router-dom";
import { useSession } from "src/hooks/useSession";

import AuthModal from "src/components/AuthModal";

const Auth = () => {
  const location = useLocation();
  const history = useHistory();

  const {
    isOpen: isOpenModal,
    onOpen: onOpenModal,
    onClose: onCloseModal,
  } = useDisclosure();

  useSession({ location, history });

  return (
    <Center h="400px">
      <VStack>
        <Box as={"h1"}>Welcome to TM Database React Client</Box>
        <Button onClick={onOpenModal}>Start Login</Button>
        <AuthModal isOpenModal={isOpenModal} onCloseModal={onCloseModal} />
      </VStack>
    </Center>
  );
};

export default Auth;
