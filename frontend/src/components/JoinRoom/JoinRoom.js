import React, {useState} from 'react';
import {Button, Form, Col} from 'react-bootstrap';
import {useToasts} from 'react-toast-notifications';
import axios from 'axios';
import {API_URL} from '../../config';

const userId = localStorage.getItem('user_id');

export const JoinRoom = (props) => {
	const [roomCode, setRoomCode] = useState(null);

	const handleInput = (e) => {
		const value = e.target.value;
		setRoomCode(value);
	};
	const handleSubmit = async () => {
		console.log(roomCode);

		try {
			const respose = await axios.post(`${API_URL}room/join/${roomCode}`, {
				userId: userId,
			});

			if (respose.data.status_code === 200) {
				window.location.href = '/game/' + roomCode;
			}
		} catch (err) {
			console.log(err);
		}
	};
	return (
		<Form>
			<Form.Group controlId="formRoomId">
				<Form.Label>Room Id</Form.Label>
				<Col sm="10">
					<Form.Control placeholder="Room Id" onInput={handleInput} />
				</Col>
			</Form.Group>

			<Form.Group controlId="forPassword">
				<Form.Label>Password</Form.Label>
				<Col sm="10">
					<Form.Control type="password" placeholder="Password" />
				</Col>
			</Form.Group>
			<Button onClick={handleSubmit}> JOIN </Button>
		</Form>
	);
};
