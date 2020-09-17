import React, {useState} from 'react';
import {Modal, Button, InputGroup, FormControl} from 'react-bootstrap';
import axios from 'axios';

const api_url = require('./../../config').API_URL;

export const ChangeName = (props) => {
	let [name, setName] = useState(null);

	const handleInput = (e) => {
		let value = e.target.value;
		setName(value);
	};

	const handleSubmit = async () => {
		console.log('name', name);
		const response = await axios.post(`${api_url}user/create`, {
			name: name,
		});

		const res = response;
		if (res.status === 200) localStorage.setItem('user_id', res.data.id);
	};

	return (
		<Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered>
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">Change Name</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<InputGroup className="mb-3">
					<InputGroup.Prepend>
						<InputGroup.Text id="basic-addon1">@</InputGroup.Text>
					</InputGroup.Prepend>
					<FormControl placeholder="Username" aria-label="Username" onInput={handleInput} />
				</InputGroup>
				<Button onClick={handleSubmit}>Save</Button>
			</Modal.Body>
		</Modal>
	);
};
