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
import RegisterMap from "../main/RegisterMap";

export default function RegisterMapModal() {
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
        地図の保存
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>名前を入力、保存ボタンを押下</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <RegisterMap closeFlunction={onClose}></RegisterMap>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
