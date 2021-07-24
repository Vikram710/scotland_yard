import React from 'react';
import {Grid, Paper, Typography} from '@material-ui/core';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import taxi from '../../assets/scotlandYard/tickets/taxi.png';
import bus from '../../assets/scotlandYard/tickets/bus.png';
import underground from '../../assets/scotlandYard/tickets/underground.png';

const ticketImgMap = {
	taxi,
	bus,
	underground,
};

const useStyles = makeStyles((theme) => ({
	root: {
		padding: '8px',
		margin: '8px',
		backgroundColor: 'black',
		color: 'white',
	},
	img: {
		height: '90%',
		margin: '4px',
		verticalAlign: 'middle',
	},
	item: {
		height: '75px',
		display: 'flex',
		justifyContent: 'space-evenly',
		'&:hover': {
			opacity: 0.9,
		},
	},
	turnDiv: {
		padding: '25px 0',
	},
	turnSpan: {
		display: 'inline-block',
		borderRadius: '50%',
		backgroundColor: 'black',
		color: 'white',
		textAlign: 'center',
		width: '25px',
		height: '25px',
		lineHeight: '25px',
		padding: '5px',
	},
}));

export const MrXBoard = (props) => {
	const classes = useStyles();
	const theme = useTheme();
	const {data} = props;
	const dummy = ['taxi', 'bus', 'underground'];
	const revealTurn = [3, 8, 13, 18, 24];
	const revealStyle = {
		backgroundColor: '#FF8C00',
		color: 'black',
	};
	return (
		<div className={classes.root}>
			<Grid container spacing={1}>
				{data.map((ele) => {
					return (
						<Grid item xs={4} key={ele}>
							<Paper className={classes.item}>
								<div className={classes.turnDiv}>
									<span
										className={classes.turnSpan}
										style={revealTurn.includes(ele + 1) ? revealStyle : {}}>
										{ele + 1}
									</span>
								</div>
								<img
									alt="logo"
									src={ticketImgMap[dummy[Math.floor(Math.random() * dummy.length)]]}
									className={classes.img}
								/>
							</Paper>
						</Grid>
					);
				})}
			</Grid>
		</div>
	);
};
