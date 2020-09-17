import React, {useState} from 'react';
import {Button, Form, Col} from 'react-bootstrap';
import axios from 'axios';
import {API_URL} from './../../config';

export const CreateRoom = (props) => {
	const [roomId, setRoomId] = useState(null);

	const handlesubmit = async () => {
		const userId = localStorage.getItem('user_id');
		const response = await axios.post(`${API_URL}room/create`, {
			userId: userId,
		});
		const roomCode = response.data.roomCode;
		setRoomId(roomCode);
	};
	return (
		<Form>
			<Form.Group controlId="formRoomId">
				<Form.Label>Room Id</Form.Label>
				<Col sm="10">
					<Form.Control value={roomId} />
				</Col>
			</Form.Group>

			<Form.Group controlId="formPassword">
				<Form.Label>Password</Form.Label>
				<Col sm="10">
					<Form.Control type="password" placeholder="Password" />
				</Col>
			</Form.Group>
			<Button onClick={handlesubmit}>Create</Button>
		</Form>
	);
};
