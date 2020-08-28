import React from 'react';
import {Button, Form, Col} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCopy} from '@fortawesome/free-solid-svg-icons';
import {useToasts} from 'react-toast-notifications';

export const JoinRoom = (props) => {
	const {addToast} = useToasts();
	const copyLink = () => {
		let text = 'link';
		let dummy = document.createElement('textarea');
		document.body.appendChild(dummy);
		dummy.value = text;
		dummy.select();
		document.execCommand('copy');
		document.body.removeChild(dummy);
		addToast('Copied link!', {appearance: 'success', autoDismiss: true});
	};
	return (
		<Form>
			<Form.Group controlId="formRoomId">
				<Form.Label>Room Id</Form.Label>
				<Col sm="10">
					<Form.Control placeholder="Room Id" />
				</Col>
			</Form.Group>

			<Form.Group controlId="forPassword">
				<Form.Label>Password</Form.Label>
				<Col sm="10">
					<Form.Control type="password" placeholder="Password" />
				</Col>
			</Form.Group>
			<Button>JOIN</Button>
			<Button onClick={copyLink}>
				<FontAwesomeIcon icon={faCopy} /> Copy Link
			</Button>
		</Form>
	);
};
