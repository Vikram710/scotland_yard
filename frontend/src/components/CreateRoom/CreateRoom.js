import React, {useState, useEffect} from 'react';
import {Button, Form, Col} from 'react-bootstrap';
import {useToasts} from 'react-toast-notifications';
import {API_URL} from '../../config';

const styles = {
	btn: {
		width: '90%',
		margin: 'auto',
	},
	btnCont: {
		display: 'flex',
	},
};

export const CreateRoom = (props) => {
	const [roomCode, setRoomCode] = useState('');
	const [password, setPassword] = useState('');
	const {addToast} = useToasts();

	useEffect(() => {
		const getRoomCode = async () => {
			let response = await fetch(API_URL + 'room/get_room_code');
			response = await response.json();
			setRoomCode(response.roomCode);
		};
		getRoomCode();
	}, []);

	const createRoom = async () => {
		let data = {
			roomCode,
			password,
			userId: localStorage.getItem('user_id'),
		};
		let response = await fetch(API_URL + 'room/create', {
			method: 'post',
			body: JSON.stringify(data),
			headers: {'Content-type': 'application/json; charset=UTF-8'},
		});
		response = await response.json();
		console.log(response);
		addToast('Success', {appearance: 'success', autoDismiss: true});
		console.log(roomCode, password);
	};
	return (
		<Form>
			<Form.Group controlId="formRoomId">
				<Form.Label>Room code</Form.Label>
				<Col sm="12">
					<Form.Control readOnly value={roomCode} />
				</Col>
			</Form.Group>

			<Form.Group controlId="formPassword">
				<Form.Label>Password</Form.Label>
				<Col sm="12">
					<Form.Control
						type="password"
						placeholder="Password"
						onChange={(e) => setPassword(e.target.value)}
					/>
				</Col>
			</Form.Group>
			<div style={styles.btnCont}>
				<Button style={styles.btn} onClick={createRoom}>
					Create
				</Button>
			</div>
		</Form>
	);
};
