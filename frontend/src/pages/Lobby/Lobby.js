import React, {useEffect, useState} from 'react';
import {Paper, List, ListItem, ListItemText, ListItemAvatar, Avatar, Button} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import mapBg from '../../assets/scotlandYard/map-min.png';
import {useToasts} from 'react-toast-notifications';
import {playerColorMap, dataFetch} from '../../utils';

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

export const Lobby = () => {
	const classes = useStyles();
	const [players, setPlayers] = useState([]);
	const {addToast} = useToasts();

	useEffect(() => {
		if (!localStorage.getItem('positions')) {
			dataFetch('pre_game/get_positions')
				.then(({json, status}) => {
					if (status === 200) localStorage.setItem('positions', JSON.stringify(json.message));
					else addToast('Error in fetching positions', {appearance: 'error', autoDismiss: true});
				})
				.catch((error) => {
					console.log(error);
					addToast('Internal Server Error', {appearance: 'error', autoDismiss: true});
				});
		}
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	useEffect(() => {
		let data = {
			roomId: localStorage.getItem('roomId'),
		};
		dataFetch('pre_game/get_room_details', data)
			.then(({json, status}) => {
				if (status === 200) setPlayers(json.message.players);
				else addToast('Error in fetching room details', {appearance: 'error', autoDismiss: true});
			})
			.catch((error) => {
				console.log(error);
				addToast('Internal Server Error', {appearance: 'error', autoDismiss: true});
			});
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	const startGame = async () => {
		let data = {
			roomId: localStorage.getItem('roomId'),
			orderedPlayers: players,
		};
		dataFetch('pre_game/order_select', data)
			.then(({json, status}) => {
				if (status === 200) addToast('Success', {appearance: 'success', autoDismiss: true});
				else addToast('Error in starting game', {appearance: 'error', autoDismiss: true});
			})
			.catch((error) => {
				console.log(error);
				addToast('Internal Server Error', {appearance: 'error', autoDismiss: true});
			});
	};

	return (
		<div className={classes.root}>
			<Paper className={classes.paper} elevation={5}>
				<List>
					{players.map((player, index) => {
						let character = 'Mr.X';
						switch (index) {
							case 1:
								character = 'Red';
								break;
							case 2:
								character = 'Blue';
								break;
							case 3:
								character = 'Purple';
								break;
							case 4:
								character = 'Green';
								break;
							case 5:
								character = 'Yellow';
								break;
							default:
								character = 'Mr.X';
						}
						return (
							<ListItem key={player.id}>
								<ListItemAvatar>
									<Avatar style={{backgroundColor: playerColorMap[character]}}></Avatar>
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
