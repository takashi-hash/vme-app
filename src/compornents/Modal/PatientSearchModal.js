import { useDisclosure } from "@chakra-ui/react";
import PullDownArea from "../main/PullDownArea";
import { Button } from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

export default function PatientSearchModal() {
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
        検索
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>検索</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <PullDownArea />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
