
import Modal from 'react-bootstrap/Modal';

const Delete = ({show, onHide}) => {
        return (
            <Modal
                show={show}
                onHide={onHide}
                centered
            >
      <Modal.Body>
          Товар удален
      </Modal.Body>
    </Modal>
    );
}

export default Delete;