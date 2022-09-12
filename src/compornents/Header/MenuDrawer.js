import React, { useState } from "react";
import {
  Flex,
  Drawer,
  DrawerOverlay,
  DrawerBody,
  DrawerContent,
  Box,
  Spacer,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import CsvPreview from "../main/CsvPreview";
import RouteChangeModal from "../Modal/RouteChangeModal";
const MenuDrawer = (props) => {
  const [DirectionsList, setDirectionsList] = useState([]);
  const { isOpen, onClose } = props;
  return (
    <Drawer placeContent="left" size="xl" isOpen={isOpen}>
      <DrawerOverlay>
        <DrawerContent>
          <DrawerBody>
            <Flex
              bg="white"
              w={"100%"}
              maxW={"90%"}
              height="10vh"
              p={10}
              alignItems="center"
              position="fixed"
              top={0}
              left={0}
              zIndex={999}
            >
              <RouteChangeModal />
              <Spacer />
              <CloseIcon onClick={onClose} />
            </Flex>
            <Box mt={"10vh"}>
              <CsvPreview
                DirectionsList={DirectionsList}
                setDirectionsList={setDirectionsList}
              />
            </Box>
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
};

export default MenuDrawer;
