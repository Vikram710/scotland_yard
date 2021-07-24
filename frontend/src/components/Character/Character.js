import React from 'react';
import {Paper, Typography} from '@material-ui/core';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import taxi from '../../assets/scotlandYard/tickets/taxi.png';
import bus from '../../assets/scotlandYard/tickets/bus.png';
import underground from '../../assets/scotlandYard/tickets/underground.png';

const playerColorMap = {
	red: '#DC143C',
	blue: '#ADD8E6',
	purple: '#800080',
	green: '#00FF7F',
	yellow: '#FAFAD2',
};
const useStyles = makeStyles((theme) => ({
	paper: {
		padding: '8px',
		margin: '8px',
	},
	img: {
		verticalAlign: 'middle',
		width: '30px',
	},
	typography: {
		fontSize: '16px',
		margin: '2px',
	},
}));

export const Character = (props) => {
	const classes = useStyles();
	const theme = useTheme();
	const {player} = props;
	return (
		<Paper
			className={classes.paper}
			style={{
				backgroundColor: playerColorMap[player],
				color: theme.palette.getContrastText(playerColorMap[player]),
			}}>
			<Typography className={classes.typography}>Name ({player})</Typography>
			<Typography className={classes.typography}>
				<img alt="logo" src={taxi} className={classes.img} /> 10
			</Typography>
			<Typography className={classes.typography}>
				<img alt="logo" src={bus} className={classes.img} /> 10
			</Typography>
			<Typography className={classes.typography}>
				<img alt="logo" src={underground} className={classes.img} /> 10
			</Typography>
		</Paper>
	);
};
