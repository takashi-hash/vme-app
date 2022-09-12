import { useDisclosure } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import RouteChange from "../main/RouteChange";

export default function RouteChangeModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button
        size={["xs", "sm", "md", "lg", "xl"]}
        fontSize={["xs", "sm", "md", "lg", "xl"]}
        colorScheme="teal"
        variant='outline'
        onClick={onOpen}
      >
        経路順の変更
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>経路順の変更</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <RouteChange />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
