import React from 'react';
import {Dialog, IconButton, Typography, Grid} from '@material-ui/core';
import taxiImg from '../../assets/scotlandYard/tickets/taxi.png';
import busImg from '../../assets/scotlandYard/tickets/bus.png';
import blackImg from '../../assets/scotlandYard/tickets/secret.png';
import undergroundImg from '../../assets/scotlandYard/tickets/underground.png';
import doubleImg from '../../assets/scotlandYard/tickets/double.png';

import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import CloseIcon from '@material-ui/icons/Close';

import {withStyles} from '@material-ui/core/styles';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	cont: {
		justifyContent: 'center',
	},
	item: {
		display: 'flex',
		justifyContent: 'center',
	},
}));

const styles = (theme) => ({
	root: {
		margin: 0,
		padding: theme.spacing(2),
	},
	closeButton: {
		position: 'absolute',
		right: theme.spacing(1),
		top: theme.spacing(1),
		color: theme.palette.grey[500],
	},
});

const DialogTitle = withStyles(styles)((props) => {
	const {children, classes, onClose, ...other} = props;
	return (
		<MuiDialogTitle disableTypography className={classes.root} {...other}>
			<Typography variant="h6">{children}</Typography>
			{onClose ? (
				<IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
					<CloseIcon />
				</IconButton>
			) : null}
		</MuiDialogTitle>
	);
});

const DialogContent = withStyles((theme) => ({
	root: {
		padding: theme.spacing(2),
	},
}))(MuiDialogContent);

export const Rules = (props) => {
	const {open, onClose} = props;
	const classes = useStyles();
	return (
		<Dialog open={open} onClose={onClose} maxWidth="lg">
			<DialogTitle onClose={onClose}>Scotland Yard Rules</DialogTitle>
			<DialogContent>
				<h5>Game Objective</h5>
				<p>
					The goal of the detectives is to work as a team to corner and catch Mr. X, by moving to the same
					spot on the board where Mr. X is currently hiding. Mr. X, on the other hand, has to evade capture
					until all the detectives run out of their transport tickets and cannot make anymore movements.
				</p>
				<h5>Set up</h5>
				<div>
					<ul>
						<li>
							Room creator first have to decide which one of them will play the role of Mr. X. All the
							others will then have to play detectives.
						</li>
						<li>
							Mr.X gets:
							<ul>
								<li>4 Taxi tickets</li>
								<li>3 Bus Tickets</li>
								<li>3 Underground Tickets</li>
								<li>5 Black Tickets</li>
								<li>2 Double-move Tickets</li>
							</ul>
						</li>
						<li>
							Each Detective Receives:
							<ul>
								<li>11 Taxi tickets</li>
								<li>8 Bus Tickets</li>
								<li>4 Underground Tickets</li>
							</ul>
						</li>
						<li>
							Starting position of each detective is randomly chosen. Mr. X can choose any position and
							must keep his starting position a secret
						</li>
					</ul>
					<Grid container className={classes.cont} spacing={2}>
						<Grid item className={classes.item} xs={4} md={4} lg={2}>
							<img alt="taxi" src={taxiImg} />
						</Grid>
						<Grid item className={classes.item} xs={4} md={4} lg={2}>
							<img alt="bus" src={busImg} />
						</Grid>
						<Grid item className={classes.item} xs={4} md={4} lg={2}>
							<img alt="underground" src={undergroundImg} />
						</Grid>
						<Grid item className={classes.item} xs={4} md={4} lg={2}>
							<img alt="black" src={blackImg} />
						</Grid>
						<Grid item className={classes.item} xs={4} md={4} lg={2}>
							<img alt="double" src={doubleImg} />
						</Grid>
					</Grid>
				</div>
				<h5>How to play</h5>
				<p>
					Scotland Yard board game rules state that Mr. X always gets the first turn. He is then followed by
					the detectives in a clockwise order. Each player must give up a travel ticket whenever they make a
					move. While Mr. X notes his moves in the travel log, the detectives must move their pieces on the
					board.
				</p>
				<h5> Basic Movements</h5>
				<p>
					Any move by a player should be a trip by bus, taxi, or underground, and each move should be paid for
					with an appropriate ticket. The different colored lines match the colors of the respective tickets
					and show the direction of movement depending on the mode of transport used. Every stop may have one
					or more color signals, depicting the transport options originating or terminating at that spot. Each
					move must advance to the next station of the selected mode of transport. You are not allowed to jump
					off on your way to a destination.
				</p>
				<h5>Moves for Mr. X</h5>
				<p>
					Mr. X gets the first turn in every round. He must note down the number of his stop in the travel
					log, and cover the number with the travel ticket he has used for his turn. This way, the detectives
					only learn about the mode of transport used, but not the actual location of Mr. X.
				</p>
				<h5>Moves for Detectives</h5>
				<p>
					After Mr. X, each detective makes their move using a travel ticket, to get to the next stop of the
					selected mode of transport. All used tickets will be given to Mr. X. He should be able to see the
					transport tickets of the detectives at all times.
				</p>
				<p>
					<strong>
						Important: The detectives have a limited number of travel tickets. If a detective uses his/her
						stock of a particular type of transport ticket, he/she cannot use that mode of transport
						anymore.
					</strong>
				</p>
				<h5>Mr. X Reveals His Position</h5>
				<p>
					Mr. X has to reveal his position at the 3rd, 8th, 13th, and 18th round of the game. During this
					move, he has to note down his stop, place his travel ticket on the note, and keep the colorless
					player counter on the stop he has moved to. This is the detective’s best chance to corner him, as he
					will again disappear in the next round.
				</p>
				<h5>Special Moves of Mr. X</h5>
				<p>
					Using Black Tickets: This is an extremely useful trick which Mr. X can use to evade arrest, and is
					dreaded by all detectives, because they do not know which mode of transport has been chosen by him.
					Black tickets can be used in place of the other tickets any time during the game. They are valid on
					all forms of transport, and can even be used to access the river transport system of the Thames,
					which can’t be used by the detectives.
				</p>
				<p>
					Double Move: Mr. X can use a double-move ticket at any time of the game to move two stops in a
					single turn. This move can be used with any combination of travel modes available at the stops. The
					player must note down the numbers of both stops and place two travel tickets over the notes. In case
					Mr. X chooses to use the double-move ticket in a round where he has to reveal his position, he must
					reveal his position only on the first stop, but should conceal the location of the second from the
					detectives.
				</p>
				<h5>End of play</h5>
				<ul>
					The game ends with either of the following scenarios:
					<li>
						Scenario No.1: A detective lands on the spot where Mr. X is currently located. If this happens,
						Mr. X must declare his position. The detectives win and Mr. X loses.
					</li>
					<li>
						Scenario No. 2: All escape routes around Mr. X are blocked by the detectives. In this case too,
						the detectives win and Mr. X loses.
					</li>
					<li>
						Scenario No.3: The detectives can’t move due to lack of appropriate transport tickets, or Mr. X
						manages to evade them till round 22. In this scenario, Mr. X wins and the detectives lose.
					</li>
				</ul>
				<h5>Important Points of the Game</h5>
				<ul>
					<li>No two detectives can land on the same stop at the same time.</li>
					<li>
						All players are allowed to travel on a route and back to their previous position. However, the
						return trip has to be done during the next round with a new travel ticket.
					</li>
					<li>Detectives cannot change the order of their moves any time during the game.</li>
					<li>
						If a detective runs out of moves, the game continues with the remaining detectives trying to
						catch Mr. X.
					</li>
					<li>
						Detectives are encouraged to discuss their strategy amongst themselves, so as to surround and
						capture Mr. X.
					</li>
					<li>
						Black tickets are best used by Mr. X after revealing his position, or in a situation where the
						detectives are too close for comfort.
					</li>
				</ul>
			</DialogContent>
		</Dialog>
	);
};
