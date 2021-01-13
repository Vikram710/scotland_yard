import React, {useState} from 'react';
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

export const JoinRoom = (props) => {
	const [roomCode, setRoomCode] = useState('');
	const [password, setPassword] = useState('');
	const {addToast} = useToasts();

	const joinRoom = async () => {
		let data = {
			roomCode,
			password,
			userId: localStorage.getItem('user_id'),
		};
		let response = await fetch(API_URL + 'room/join', {
			method: 'post',
			body: JSON.stringify(data),
			headers: {'Content-type': 'application/json; charset=UTF-8'},
		});
		response = await response.json();
		console.log(response);
		addToast('Success', {appearance: 'success', autoDismiss: true});
	};
	return (
		<Form>
			<Form.Group controlId="formRoomId">
				<Form.Label>Room Id</Form.Label>
				<Col sm="12">
					<Form.Control placeholder="Room Id" onChange={(e) => setRoomCode(e.target.value)} />
				</Col>
			</Form.Group>

			<Form.Group controlId="forPassword">
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
				<Button style={styles.btn} onClick={joinRoom}>
					JOIN
				</Button>
			</div>
		</Form>
	);
};
