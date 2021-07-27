import React from 'react';
import {Paper, Typography, Grid} from '@material-ui/core';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import taxi from '../../assets/scotlandYard/tickets/taxi.png';
import bus from '../../assets/scotlandYard/tickets/bus.png';
import underground from '../../assets/scotlandYard/tickets/underground.png';
import black from '../../assets/scotlandYard/tickets/black.png';

const playerColorMap = {
	Red: '#DC143C',
	Blue: '#ADD8E6',
	Purple: '#800080',
	Green: '#00FF7F',
	Yellow: '#FAFAD2',
	'Mr.X': '#333',
};
const ticketImgMap = {
	taxi,
	bus,
	underground,
	black,
};
const useStyles = makeStyles((theme) => ({
	paper: {
		padding: '8px',
		margin: '8px',
	},
	img: {
		verticalAlign: 'middle',
		width: '40px',
	},
	gridItem: {
		fontSize: '18px',
		textAlign: 'center',
	},
	typography: {
		fontSize: '20px',
	},
	active: {
		display: 'inline-block',
		width: '15px',
		height: '15px',
		backgroundColor: 'green',
		borderRadius: '50%',
	},
}));

const leftPad = (number, targetLength) => {
	var output = number + '';
	while (output.length < targetLength) {
		output = '0' + output;
	}
	return output;
};

export const Character = (props) => {
	const classes = useStyles();
	const theme = useTheme();
	const {player, isTurn} = props;
	return (
		<Paper
			className={classes.paper}
			style={{
				backgroundColor: playerColorMap[player.character.name],
				color: theme.palette.getContrastText(playerColorMap[player.character.name]),
			}}>
			<Typography className={classes.typography}>
				{`${player.user.name} (${player.character.name}) -> ${player.position} `}
				{isTurn ? <span className={classes.active}></span> : null}
			</Typography>
			<Grid container>
				{Object.keys(player.tickets).map((ele, idx) => {
					return (
						<Grid item xs={6} className={classes.gridItem} key={idx}>
							<img alt={ele} src={ticketImgMap[ele]} className={classes.img} />{' '}
							{leftPad(player.tickets[ele], 2)}
						</Grid>
					);
				})}
			</Grid>
		</Paper>
	);
};
