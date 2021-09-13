import { useRef } from "react";
import { Link as ReactRouterLink } from "react-router-dom";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Flex,
  Box,
  Link,
  Button,
} from "@chakra-ui/react";
import { selectIsOpenSidebar, setIsOpenSidebar } from "./layoutSlice";
import { useAppDispatch, useAppSelector } from "src/store/hooks";
import { removeAuthInfo } from "src/features/auth/authSlice";

const TheSidebar = () => {
  const btnRef = useRef(null);
  const navRef = useRef(null);
  const isOpenSidebar = useAppSelector(selectIsOpenSidebar);
  const dispatch = useAppDispatch();

  return (
    <Drawer
      isOpen={isOpenSidebar}
      placement="right"
      onClose={() => {
        dispatch(setIsOpenSidebar(false));
      }}
      finalFocusRef={btnRef}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>TMDB React Client</DrawerHeader>
        <DrawerBody>
          <Flex
            ref={navRef}
            p="5%"
            flexDir="column"
            w="100%"
            as="nav"
            onClick={(e) => {
              if (e.target === navRef.current) {
                return;
              }
              dispatch(setIsOpenSidebar(false));
            }}
          >
            <Link as={ReactRouterLink} to={"/"}>
              <Box px={2.5}>Home</Box>
            </Link>
            <Link as={ReactRouterLink} to={"/watchlist"}>
              <Box px={2.5}>Watchlist</Box>
            </Link>
          </Flex>
        </DrawerBody>
        <DrawerFooter>
          <Button
            variant="outline"
            mr={3}
            onClick={() => {
              dispatch(setIsOpenSidebar(false));
            }}
          >
            Cancel
          </Button>
          <Button
            colorScheme="linkedin"
            onClick={() => {
              dispatch(removeAuthInfo());
              localStorage.removeItem("__TMDB_AUTHINFO__");
            }}
          >
            Logout
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default TheSidebar;
