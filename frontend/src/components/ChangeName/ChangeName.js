import React, {useState} from 'react';
import {useToasts} from 'react-toast-notifications';
import {Dialog, Button, DialogActions, DialogContent, DialogTitle, TextField} from '@material-ui/core';
import {dataFetch} from '../../utils';

export const ChangeName = (props) => {
	const {open, onClose, setChangeNameModal} = props;
	const [name, setName] = useState(localStorage.getItem('user_id') ? localStorage.getItem('name') : '');
	const {addToast} = useToasts();
	const submitFrom = async () => {
		let data = {
			name,
		};
		try {
			if (!localStorage.getItem('user_id')) {
				dataFetch('room/create', data)
					.then(({json, status}) => {
						if (status === 200) {
							localStorage.setItem('name', json.name);
							localStorage.setItem('user_id', json.id);
							addToast('Success', {appearance: 'success'});
						} else addToast('Error in fetching positions', {appearance: 'error', autoDismiss: true});
					})
					.catch((error) => {
						console.log(error);
						addToast('Internal Server Error', {appearance: 'error', autoDismiss: true});
					});
			} else {
				data.id = localStorage.getItem('user_id');
				dataFetch('room/update', data)
					.then(({json, status}) => {
						if (status === 200) {
							localStorage.setItem('name', json.name);
							localStorage.setItem('user_id', json.id);
							addToast('Success', {appearance: 'success'});
						} else addToast('Error in fetching positions', {appearance: 'error', autoDismiss: true});
					})
					.catch((error) => {
						console.log(error);
						addToast('Internal Server Error', {appearance: 'error', autoDismiss: true});
					});
			}
		} catch (err) {
			console.log(err);
			addToast('Error', {appearance: 'error'});
		}
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
