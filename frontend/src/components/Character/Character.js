import React from 'react';
import {Paper, Typography, Grid} from '@material-ui/core';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import {playerColorMap, ticketImgMap} from '../../utils';

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
				{`${player.user.name} (${player.character.name}) ${player.position ? ' -> ' + player.position : ''} `}
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
