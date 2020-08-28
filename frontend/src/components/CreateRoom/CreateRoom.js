import React from 'react';
import {Button, Form, Col} from 'react-bootstrap';

export const CreateRoom = (props) => {
	return (
		<Form>
			<Form.Group controlId="formRoomId">
				<Form.Label>Room Id</Form.Label>
				<Col sm="10">
					<Form.Control readOnly value="6515" />
				</Col>
			</Form.Group>

			<Form.Group controlId="formPassword">
				<Form.Label>Password</Form.Label>
				<Col sm="10">
					<Form.Control type="password" placeholder="Password" />
				</Col>
			</Form.Group>
			<Button>Create</Button>
		</Form>
	);
};
