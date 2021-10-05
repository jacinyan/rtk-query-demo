import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
} from "@chakra-ui/react";
import { useCallback } from "react";
import { useToast } from "@chakra-ui/toast";

interface IProps {
  isOpenModal: boolean;
  onCloseModal: () => void;
}

const AuthModal = ({ isOpenModal, onCloseModal }: IProps) => {
  const toast = useToast();

  const handleRedirect = useCallback(async () => {
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
  }, [toast]);

  return (
    <>
      <Modal isOpen={isOpenModal} onClose={onCloseModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>TMDB Redirection</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>You'll be redirected to TMDB, do you agree to continue?</Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onCloseModal}>
              Close
            </Button>
            <Button variant="ghost" onClick={handleRedirect}>
              Confirm
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AuthModal;
