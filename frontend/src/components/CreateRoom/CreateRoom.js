import React, {useState} from 'react';
import {Button, Form, Col} from 'react-bootstrap';
import axios from 'axios';
import {API_URL} from './../../config';
import TextField from '@material-ui/core/TextField';
export const CreateRoom = (props) => {
	const [roomId, setRoomId] = useState(null);
	const [username, setName] = useState("");
	function handleUsername(e)
	{
		setName(e.target.value);
	}
	const handlesubmit = async () => {
		const response = await axios.post(`${API_URL}room/create`, {
			userName: username,
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
			<Form.Group controlId="forUsername">
				<Form.Label>Username</Form.Label>
				<Col sm="10">
					<TextField required id="username" type="text" label="username" onChange ={handleUsername} variant="outlined"/>
				</Col>
			</Form.Group>
			<Button onClick={handlesubmit}>Create</Button>
			<br></br>
			Enter the username and password 
			<br></br>
			 click create . The id will be displayed in that bar. 
			<br />
			Send it to friends to enjoy playing!!!
		</Form>
	);
};
