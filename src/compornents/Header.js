import React, { useContext } from "react";
import dig from "object-dig";
import { logOut } from "../service/firebase";
import { AuthContext } from "../providers/Auth.Provider";
import {
  Flex,
  Heading,
  Spacer,
  IconButton,
  Drawer,
  DrawerOverlay,
  DrawerBody,
  Button,
  useDisclosure,
  DrawerContent,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import ViewLogin from "./pages/Login";
import Loading from "./pages/Loading";

const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { currentUser, isLoading } = useContext(AuthContext);

  const buttonRender = () => {
    let buttonDom;
    if (isLoading) {
      buttonDom = <Loading></Loading>;
    } else if (dig(currentUser, "auth", "currentUser", "uid")) {
      return (
        <>
          <Flex
            as="nav"
            bg="teal.500"
            color="gray.50"
            align="center"
            justify="space-between"
            padding={{ base: 5, md: 8 }}
          >
            <button onClick={logOut}>ログアウト</button>
            <Heading as="h1" fontSize={{ base: "md", md: "xl" }}>
              訪問診療支援
            </Heading>
            <Spacer />
            <IconButton
              colorScheme="teal"
              size="xl"
              icon={<HamburgerIcon />}
              onClick={onOpen}
            />
          </Flex>
          <Drawer
            placeContent="left"
            size="xl"
            onClose={onClose}
            isOpen={isOpen}
          >
            <DrawerOverlay>
              <DrawerContent>
                <DrawerBody>
                  <Button>button1</Button>
                </DrawerBody>
              </DrawerContent>
            </DrawerOverlay>
          </Drawer>
        </>
      );
    } else {
      buttonDom = <ViewLogin />;
    }
    return buttonDom;
  };
  return <header>{buttonRender()}</header>;
};

export default Header;
