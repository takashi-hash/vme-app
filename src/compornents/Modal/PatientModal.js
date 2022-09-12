import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import PatientDetail from "../main/PatientDetail";

export default function PatientModal(props) {
  const isOpen = props.open;
  const onClose = props.closeFlunction;
  const patientId = props.patientId;

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader></ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <PatientDetail
              id={patientId}
              DirectionsList={props.DirectionsList}
              setDirectionsList={props.setDirectionsList}
              closeFlunction={onClose}
            />
          </ModalBody>
          <ModalFooter />
        </ModalContent>
      </Modal>
    </>
  );
}
