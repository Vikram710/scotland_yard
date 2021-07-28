import React, {useEffect, useState} from 'react';
import {Grid} from '@material-ui/core/';
import {makeStyles} from '@material-ui/core/styles';
import mapimage from '../../assets/scotlandYard/map-min.png';
import Panzoom from '@panzoom/panzoom';
import {API_URL} from '../../config';
import {Transport} from '../../components/Transport';
import {Character} from '../../components/Character';
import {MrXBoard} from '../../components/MrXBoard';
import {useToasts} from 'react-toast-notifications';
import io from 'socket.io-client';
import {playerColorMap, dataFetch} from '../../utils';
import {GameOver} from '../../components/GameOver';

const mapPosToPosID = (x, y) => {
	let postitions = JSON.parse(localStorage.getItem('positions'));
	function distance(p) {
		return Math.sqrt(Math.pow(x - p.map_x, 2) + Math.pow(y - p.map_y, 2));
	}
	let closest = postitions.reduce((a, b) => (distance(a) < distance(b) ? a : b));
	return closest;
};
const placeToMapPos = (place) => {
	let postitions = JSON.parse(localStorage.getItem('positions'));
	return postitions[place - 1];
};

const useStyles = makeStyles((theme) => ({
	paper: {
		padding: '8px',
		margin: '4px',
	},
	img: {
		verticalAlign: 'middle',
	},
	typography: {
		fontSize: '14px',
		margin: '2px',
	},
	grid: {
		marginTop: '20px',
	},
	canvasHolder: {
		width: '99%',
		height: '100%',
		margin: 'auto',
	},
	canvas: {
		width: '100%',
		height: '100%',
	},
}));

const socket = io(API_URL);

export const Game = (props) => {
	const [panzoom, setPanzoom] = useState(null);
	const [stateImg, setStateImg] = useState({});
	const [possibleRoutes, setPossibleRoutes] = useState([]);
	const [selectRoute, setSelectRoute] = useState('');
	const [toPoint, setToPoint] = useState(0);
	const [players, setPlayers] = useState([]);
	const [user, setUser] = useState({});
	const [gameDetails, setGameDetails] = useState({});
	const [mrXboardDetails, setMrXboardDetails] = useState([]);
	const [gameOver, setGameOver] = useState(false);
	const [winner, setWinner] = useState('');
	const playerId = localStorage.getItem('playerId');
	const classes = useStyles();
	const {addToast} = useToasts();

	const showpos = async (e) => {
		const ele = document.getElementById('map');

		const canvas = document.getElementById('map');
		let ctx = canvas.getContext('2d');
		let bounds = ele.getBoundingClientRect();

		// get the mouse coordinates, subtract the canvas top left and any scrolling
		let mx = e.pageX - bounds.left - window.scrollX;
		let my = e.pageY - bounds.top - window.scrollY;
		mx /= bounds.width;
		my /= bounds.height;

		mx *= canvas.width;
		my *= canvas.height;
		drawMap();
		drawPositions();
		let point = mapPosToPosID(mx - 60, my - 60);
		ctx.beginPath();
		ctx.arc(point.map_x + 60, point.map_y + 60, 30, 0, 2 * Math.PI);
		ctx.strokeStyle = '#fff';
		ctx.lineWidth = 16;
		ctx.stroke();
		ctx.closePath();
		setToPoint(point.place);
		getRoutes(point.place);
	};

	const drawMap = () => {
		const canvas = document.getElementById('map');
		let ctx = canvas.getContext('2d');
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		let sc = Math.min(canvas.width / stateImg.width, canvas.height / stateImg.height);
		// get the top left position of the image
		ctx.drawImage(stateImg, 0, 0, stateImg.width * sc, stateImg.height * sc);
	};

	const drawPositions = () => {
		const canvas = document.getElementById('map');
		let ctx = canvas.getContext('2d');

		if (players.length > 0) {
			players.forEach((player) => {
				if (player.position) {
					let point = placeToMapPos(player.position);
					ctx.beginPath();
					ctx.arc(point.map_x + 60, point.map_y + 60, 30, 0, 2 * Math.PI);
					ctx.strokeStyle = playerColorMap[player.character.name];
					ctx.lineWidth = 16;
					ctx.stroke();
					ctx.closePath();
				}
			});
		}
	};

	const exitGame = () => {
		console.log('exit');
		localStorage.removeItem('roomId');
		localStorage.removeItem('playerId');
		window.location.replace('/');
	};

	useEffect(() => {
		let data = {
			roomId: localStorage.getItem('roomId'),
			playerId: localStorage.getItem('playerId'),
		};
		dataFetch('pre_game/get_room_details', data)
			.then(({json, status}) => {
				if (status === 200) {
					if (!json.message.room.active) exitGame();
					setPlayers(json.message.players);
					setGameDetails(json.message.room);
					setMrXboardDetails(json.message.mrXboardDetails);
					json.message.players.forEach((player) => {
						if (player._id === playerId) setUser(player);
					});
				} else addToast('Error in fetch game details', {appearance: 'error', autoDismiss: true});
			})
			.catch((error) => {
				console.log(error);
				addToast('Internal Server Error', {appearance: 'error', autoDismiss: true});
			});
	}, [playerId]); // eslint-disable-line react-hooks/exhaustive-deps

	useEffect(() => {
		const canvas = document.getElementById('map');
		let ctx = canvas.getContext('2d');
		let img = new Image();
		img.src = mapimage;
		img.onload = function (e) {
			canvas.width = img.width;
			canvas.height = img.height;
			setStateImg(img);
			// get the scale
			let sc = Math.min(canvas.width / img.width, canvas.height / img.height);
			ctx.drawImage(img, 0, 0, img.width * sc, img.height * sc);
		};

		const elem = document.getElementById('map');
		let panzoomTemp = panzoom
			? panzoom
			: Panzoom(elem, {
					maxScale: 4,
					canvas: true,
					startScale: 1.5,
					contain: 'outside',
					cursor: 'default',
			  });
		panzoomTemp.pan(10, 10);
		setPanzoom(panzoomTemp);
		elem.parentElement.addEventListener('wheel', panzoomTemp.zoomWithWheel);
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	useEffect(() => {
		if (players.length > 0) {
			drawMap();
			drawPositions();
		}
	}, [players]); // eslint-disable-line react-hooks/exhaustive-deps

	const getRoutes = async (toPoint) => {
		let data = {
			playerId,
			toPoint,
		};
		dataFetch('game/get_possible_routes', data)
			.then(({json, status}) => {
				if (status === 200) {
					setPossibleRoutes(json.message);
					setSelectRoute('');
				} else addToast('Error in fetch game details', {appearance: 'error', autoDismiss: true});
			})
			.catch((error) => {
				console.log(error);
				addToast('Internal Server Error', {appearance: 'error', autoDismiss: true});
			});
	};

	const handleRouteSelection = (event) => {
		setSelectRoute(event.target.value);
	};

	const makeMove = () => {
		socket.emit('move', {toPoint, playerId, selectRoute}, (message, room, mrXboardDetails) => {
			if (message === 'Success') {
				if (!room.active) {
					setWinner(room.winner);
					setGameOver(true);
				}
				setSelectRoute('');
				setPossibleRoutes([]);
				let newUser = {...user};
				newUser.position = toPoint;
				setUser(newUser);
				let newPlayers = [...players];
				newPlayers.forEach((player) => {
					if (player._id === newUser._id) player.position = newUser.position;
				});
				setPlayers(newPlayers);
				setGameDetails(room);
				setMrXboardDetails(mrXboardDetails);
				addToast(message, {appearance: 'info', autoDismiss: true});
			} else {
				addToast(message, {appearance: 'error', autoDismiss: true});
			}
		});
	};

	useEffect(() => {
		socket.on('receiveMove', (data) => {
			console.log(data);
			if (Object.keys(data).length > 1) {
				if (!data.room.active) {
					setWinner(data.room.winner);
					setGameOver(true);
				}
				setPlayers(data.allPlayers);
				setGameDetails(data.room);
				setMrXboardDetails(data.mrXboardDetails);
				addToast(data.message, {appearance: 'info', autoDismiss: true});
			} else addToast(data.message, {appearance: 'error', autoDismiss: true});
		});
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	useEffect(() => {
		let data = {
			roomId: localStorage.getItem('roomId'),
			playerId: localStorage.getItem('playerId'),
		};
		socket.emit('joinRoom', data);
	}, []);

	return (
		<>
			<Grid container className={classes.grid}>
				<Grid item xs={7}>
					<div className={classes.canvasHolder}>
						<canvas draggable="true" className={classes.canvas} onDoubleClick={showpos} id="map"></canvas>
					</div>
				</Grid>
				<Grid item xs={5}>
					<Grid container>
						<Grid item xs={4}>
							{possibleRoutes.length ? (
								<Transport
									fromPoint={user.position}
									toPoint={toPoint}
									possibleRoutes={possibleRoutes}
									handleRouteSelection={handleRouteSelection}
									selectRoute={selectRoute}
									makeMove={makeMove}
								/>
							) : null}
							{players.length
								? players.map((player) => {
										return (
											<Character
												key={player._id}
												player={player}
												isTurn={player._id === gameDetails.turn}
											/>
										);
								  })
								: null}
						</Grid>
						<Grid item xs={8}>
							<MrXBoard data={mrXboardDetails} />
						</Grid>
					</Grid>
				</Grid>
			</Grid>
			<GameOver open={gameOver} exitGame={exitGame} winner={winner} />
		</>
	);
};
