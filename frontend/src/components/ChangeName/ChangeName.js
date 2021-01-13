import React, {useState} from 'react';
import {Modal, Button, Form, Col} from 'react-bootstrap';
import {useToasts} from 'react-toast-notifications';
import {API_URL} from '../../config';

export const ChangeName = (props) => {
	const {setChangeNameModal} = props;
	const [name, setName] = useState(localStorage.getItem('user_id') ? localStorage.getItem('name') : '');
	const {addToast} = useToasts();
	const submitFrom = async () => {
		let data = {
			name,
		};
		if (!localStorage.getItem('user_id')) {
			let response = await fetch(API_URL + 'user/create', {
				method: 'post',
				body: JSON.stringify(data),
				headers: {'Content-type': 'application/json; charset=UTF-8'},
			});
			response = await response.json();
			localStorage.setItem('name', response.name);
			localStorage.setItem('user_id', response.id);
		}

		addToast('Success', {appearance: 'success', autoDismiss: true});
		setChangeNameModal(false);
	};
	return (
		<Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered>
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">Username</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form>
					<Form.Group controlId="formRoomId">
						<Form.Label>Name</Form.Label>
						<Col sm="12">
							<Form.Control placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
						</Col>
					</Form.Group>
				</Form>
				<Button onClick={submitFrom}>Save</Button>
			</Modal.Body>
		</Modal>
	);
};
