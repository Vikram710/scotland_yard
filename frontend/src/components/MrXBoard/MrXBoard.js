import React, {useState} from 'react';
import {Grid, Paper, Typography} from '@material-ui/core';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import taxi from '../../assets/scotlandYard/tickets/taxi.png';
import bus from '../../assets/scotlandYard/tickets/bus.png';
import underground from '../../assets/scotlandYard/tickets/underground.png';
import black from '../../assets/scotlandYard/tickets/black.png';

const ticketImgMap = {
	taxi,
	bus,
	underground,
	black,
};

const useStyles = makeStyles((theme) => ({
	root: {
		padding: '8px',
		margin: '8px',
		backgroundColor: 'black',
		color: 'white',
	},
	img: {
		width: '90%',
		margin: '4px',
		verticalAlign: 'middle',
	},
	item: {
		height: '75px',
		display: 'flex',
		backgroundColor: '#333',
		justifyContent: 'space-evenly',
		'&:hover': {
			opacity: 0.9,
		},
	},
	gridItem: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
	turnSpan: {
		display: 'inline-block',
		borderRadius: '50%',
		backgroundColor: 'black',
		color: 'white',
		textAlign: 'center',
		width: '25px',
		height: '25px',
		lineHeight: '15px',
		padding: '5px',
	},
	revealDiv: {
		color: 'white',
		fontSize: '32px',
	},
}));

export const MrXBoard = (props) => {
	const [revealCards, setRevealCards] = useState([false, false, false, false, false]);
	const classes = useStyles();
	const {data} = props;
	const dummy = ['taxi', 'bus', 'underground'];
	const revealTurn = [3, 8, 13, 18, 24];
	const revealStyle = {
		backgroundColor: '#FF8C00',
		color: 'black',
	};

	const handleRevealTurn = (idx) => {
		let newRevealCards = [...revealCards];
		let ridx = revealTurn.indexOf(idx);
		if (ridx !== -1) newRevealCards[ridx] = !newRevealCards[ridx];
		setRevealCards(newRevealCards);
	};
	return (
		<div className={classes.root}>
			<Grid container spacing={1}>
				{data.map((ele, index) => {
					return (
						<Grid item xs={4} key={index} onClick={() => handleRevealTurn(index + 1)}>
							<Paper className={classes.item}>
								<Grid container>
									<Grid item xs={4} className={classes.gridItem}>
										<span
											className={classes.turnSpan}
											style={revealTurn.includes(index + 1) ? revealStyle : {}}>
											{index + 1}
										</span>
									</Grid>
									<Grid item xs={8} className={classes.gridItem}>
										{revealTurn.indexOf(index + 1) !== -1 &&
										revealCards[revealTurn.indexOf(index + 1)] ? (
											<div className={classes.revealDiv}>{ele.toPosition}</div>
										) : ele.ticketUsed ? (
											<img
												alt="logo"
												src={ticketImgMap[ele.ticketUsed.name]}
												className={classes.img}
											/>
										) : null}
									</Grid>
								</Grid>
							</Paper>
						</Grid>
					);
				})}
			</Grid>
		</div>
	);
};
