import React from 'react';
import {Select, MenuItem, Button, Paper, Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

import taxi from '../../assets/scotlandYard/tickets/taxi.png';
import bus from '../../assets/scotlandYard/tickets/bus.png';
import underground from '../../assets/scotlandYard/tickets/underground.png';

const ticketImgMap = {
	taxi,
	bus,
	underground,
};

const useStyles = makeStyles((theme) => ({
	paper: {
		padding: '10px',
		textAlign: 'center',
		margin: '8px',
		backgroundColor: 'whitesmoke',
	},
	btn: {
		fontSize: '14px',
		backgroundColor: '#4BB543',
		color: 'white',
		'&:hover': {
			backgroundColor: '#4BB543',
			opacity: 0.9,
		},
		margin: 'auto',
	},
	select: {
		width: '100%',
		margin: '4px 0',
	},
	typography: {
		fontSize: '14px',
		margin: '2px',
	},
	img: {
		verticalAlign: 'middle',
		width: '30px',
		marginRight: '10px',
	},
	route: {
		display: 'flex',
		justifyContent: 'space-evenly',
	},
	point: {
		width: '50px',
		height: '50px',
		borderRadius: '50%',
		border: '5px solid #000080',
		lineHeight: '40px',
	},
	arrow: {
		lineHeight: '50px',
		fontSize: '32px',
	},
}));

export const Transport = (props) => {
	const classes = useStyles();
	const {fromPoint, toPoint, handleRouteSelection, selectRoute, possibleRoutes} = props;
	return (
		<Paper className={classes.paper}>
			<div className={classes.route}>
				<div className={classes.point}>{fromPoint}</div>
				<div className={classes.arrow}>&rarr;</div>
				<div className={classes.point}>{toPoint}</div>
			</div>
			<Select onChange={handleRouteSelection} value={selectRoute} className={classes.select}>
				{possibleRoutes.map((route) => {
					return (
						<MenuItem value={route.mode._id} key={route.mode._id}>
							<img alt="logo" src={ticketImgMap[route.mode.name]} className={classes.img} />{' '}
							{route.mode.name}
						</MenuItem>
					);
				})}
			</Select>
			<Button variant="contained" className={classes.btn}>
				Transport
			</Button>
		</Paper>
	);
};
