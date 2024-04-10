import { ReactNode } from "react";
import Modal from "react-bootstrap/Modal";

interface DialogProps {
  show: boolean;
  title: string;
  children: ReactNode
  handleClose: () => void;
}

function Dialog({ show, title, children, handleClose }: DialogProps) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
    </Modal>
  );
}

export default Dialog;
