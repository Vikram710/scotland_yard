import React, {useState} from 'react';
import {Button, TextField, Grid} from '@material-ui/core';
import {useToasts} from 'react-toast-notifications';
import {API_URL} from '../../config';
import {makeStyles, withStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
	btn: {
		width: '100%',
		backgroundColor: '#007bff',
		color: 'white',
		margin: 'auto',
	},
	btnCont: {
		display: 'flex',
		margin: '10px 0',
	},
	input: {
		color: 'white',
	},
}));

const CssTextField = withStyles({
	root: {
		'& label.Mui-focused': {
			color: 'white',
		},

		'& label': {
			color: 'white',
		},
		'& .MuiInputBase-input': {
			color: '#fff', // Text color
		},
		'& .MuiInput-underline:before': {
			borderBottomColor: '#fff', // Semi-transparent underline
		},
		'& .MuiInput-underline:hover:before': {
			borderBottomColor: '#fff', // Solid underline on hover
		},
		'& .MuiInput-underline:after': {
			borderBottomColor: '#fff', // Solid underline on focus
		},
	},
})(TextField);

export const JoinRoom = (props) => {
	const [roomCode, setRoomCode] = useState('');
	const [password, setPassword] = useState('');
	const {addToast} = useToasts();
	const classes = useStyles();

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
		<>
			<Grid container spacing={2}>
				<Grid item xs={12}>
					<CssTextField
						autoComplete="off"
						InputProps={{
							className: classes.input,
						}}
						onChange={(e) => setRoomCode(e.target.value)}
						fullWidth
						label="Room Code"
						id="roomCode"
						name="roomCode"
					/>
				</Grid>
				<Grid item xs={12}>
					<CssTextField
						autoComplete="off"
						InputProps={{
							className: classes.input,
						}}
						onChange={(e) => setPassword(e.target.value)}
						fullWidth
						label="Password"
						id="password"
						name="password"
						type="password"
					/>
				</Grid>
			</Grid>
			<div className={classes.btnCont}>
				<Button className={classes.btn} onClick={joinRoom} color="primary">
					JOIN
				</Button>
			</div>
		</>
	);
};
