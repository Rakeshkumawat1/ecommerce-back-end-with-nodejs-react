import React from 'react'
import { Modal, Button } from 'react-bootstrap'

const NameModal = (props) => {
    return (
        
        <Modal
            
            show={props.show}
            onHide={props.handleClose}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>props.modalTitle</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {props.childern}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={props.handleSubmit}>
                    Save
                </Button>
            </Modal.Footer> 
        </Modal>

    )
}

export default NameModal                                                                            