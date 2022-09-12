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
import ColorChoice from "../main/ColorChoice";

export default function ColorChoiceModal() {
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
        マーカの色変更
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>マーカの色変更</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <ColorChoice closeFlunction={onClose} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
