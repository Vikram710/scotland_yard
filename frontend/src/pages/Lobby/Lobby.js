import React, {useEffect, useState} from 'react';
import {Paper, List, ListItem, ListItemText, ListItemAvatar, Avatar, Button} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {API_URL} from '../../config';
import mapBg from '../../assets/scotlandYard/map-min.png';
const useStyles = makeStyles((theme) => ({
	root: {
		height: '100%',
		backgroundColor: 'black',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundImage: `url(${mapBg})`,
		backgroundPosition: 'center',
	},
	paper: {
		backgroundColor: '#333',
		position: 'absolute',
		borderRadius: '8px',
		minWidth: 500,
		minHeight: 300,
		margin: 'auto',
		color: '#fff',
		marginBottom: '20px',
		textAlign: 'center',
		padding: 20,
	},
	indicator: {
		height: '100%',
		backgroundColor: '#333',
		zIndex: 0,
	},
	appbar: {
		backgroundColor: 'black',
		color: '#fff',
	},
	tab: {
		zIndex: 1,
	},
	start: {
		width: '50%',
		margin: 'auto',
		backgroundColor: 'floralwhite',
	},
}));

const playerColorMap = {
	red: '#DC143C',
	blue: '#ADD8E6',
	purple: '#800080',
	green: '#00FF7F',
	yellow: 'gold',
	mrx: 'black',
};

export const Lobby = () => {
	const classes = useStyles();
	const [players, setPlayers] = useState([]);

	useEffect(() => {
		const fetchPositions = async () => {
			try {
				if (!localStorage.getItem('positions')) {
					let response = await fetch(API_URL + 'pre_game/get_positions', {
						method: 'GET',
						headers: {'Content-type': 'application/json; charset=UTF-8'},
					});
					response = await response.json();
					console.log(response);
					localStorage.setItem('positions', JSON.stringify(response.message));
				}
			} catch (error) {
				console.log(error);
			}
		};

		fetchPositions();
	}, []);

	useEffect(() => {
		let data = {
			roomId: localStorage.getItem('roomId'),
		};
		const getRoomPLayers = async () => {
			let response = await fetch(API_URL + 'pre_game/get_room_details', {
				method: 'POST',
				body: JSON.stringify(data),
				headers: {'Content-type': 'application/json; charset=UTF-8'},
			});
			response = await response.json();
			setPlayers(response.message.players);
		};
		getRoomPLayers();
	}, []);

	const startGame = async () => {
		let data = {
			roomId: localStorage.getItem('roomId'),
			orderedPlayers: players,
		};
		let response = await fetch(API_URL + 'pre_game/order_select', {
			method: 'POST',
			body: JSON.stringify(data),
			headers: {'Content-type': 'application/json; charset=UTF-8'},
		});
		response = await response.json();
		console.log(response);
	};

	return (
		<div className={classes.root}>
			<Paper className={classes.paper} elevation={5}>
				<List>
					{players.map((player, index) => {
						let character = 'MrX';
						switch (index) {
							case 1:
								character = 'RED';
								break;
							case 2:
								character = 'BLUE';
								break;
							case 3:
								character = 'PURPLE';
								break;
							case 4:
								character = 'GREEN';
								break;
							case 5:
								character = 'YELLOW';
								break;
							default:
								character = 'MrX';
						}
						return (
							<ListItem key={player.id}>
								<ListItemAvatar>
									<Avatar style={{backgroundColor: playerColorMap[character.toLowerCase()]}}></Avatar>
								</ListItemAvatar>
								<ListItemText primary={`${player.user.name} (${character})`} />
							</ListItem>
						);
					})}
				</List>
				<Button variant="contained" className={classes.start} onClick={startGame}>
					Start
				</Button>
			</Paper>
		</div>
	);
};
