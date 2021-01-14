import React, {useState} from 'react';
import {useToasts} from 'react-toast-notifications';
import {API_URL} from '../../config';
import {Dialog, Button, DialogActions, DialogContent, DialogTitle, TextField} from '@material-ui/core';

export const ChangeName = (props) => {
	const {open, onClose, setChangeNameModal} = props;
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
		<Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
			<DialogTitle>Username</DialogTitle>
			<DialogContent>
				<TextField
					margin="dense"
					id="name"
					label="Name"
					type="name"
					fullWidth
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
			</DialogContent>
			<DialogActions>
				<Button onClick={onClose} color="primary">
					Cancel
				</Button>
				<Button onClick={submitFrom} color="primary">
					Submit
				</Button>
			</DialogActions>
		</Dialog>
	);
};
