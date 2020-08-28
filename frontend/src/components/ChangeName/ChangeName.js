import React from 'react';
import {Modal, Button} from 'react-bootstrap';

export const ChangeName = (props) => {
	return (
		<Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered>
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">Change Name</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Button>Save</Button>
			</Modal.Body>
		</Modal>
	);
};
