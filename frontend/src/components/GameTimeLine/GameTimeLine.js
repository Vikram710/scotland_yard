import React from 'react';
import {Dialog, DialogContent, DialogTitle, Paper, List, ListItem, Avatar, ListItemAvatar} from '@material-ui/core';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineDot from '@material-ui/lab/TimelineDot';

import taxi from '../../assets/scotlandYard/tickets/taxi.png';
import bus from '../../assets/scotlandYard/tickets/bus.png';
import underground from '../../assets/scotlandYard/tickets/underground.png';
import black from '../../assets/scotlandYard/tickets/black.png';

const playerColorMap = {
	red: '#DC143C',
	blue: '#ADD8E6',
	purple: '#800080',
	green: '#00FF7F',
	yellow: '#FAFAD2',
};

const ticketImgMap = {
	taxi,
	bus,
	underground,
	black,
};

const useStyles = makeStyles((theme) => ({
	content: {
		backgroundColor: '#333',
		color: '#fff',
	},
	paper: {
		padding: '6px 16px',
	},
	secondaryTail: {
		backgroundColor: theme.palette.secondary.main,
	},
	img: {
		verticalAlign: 'middle',
		width: '30px',
	},
	turnAvatar: {
		color: '#fff',
		backgroundColor: 'darkblue',
	},
	hiAvatar: {
		width: '30px',
		height: '30px',
	},
	hiListItem: {
		paddingTop: 0,
	},
	hiRoute: {
		display: 'flex',
		justifyContent: 'space-evenly',
		width: '100%',
	},
}));

export const GameTimeLine = (props) => {
	const classes = useStyles();
	const theme = useTheme();
	const {open, onClose} = props;
	const timeline = Array.from(Array(24).keys());

	const historyItem = (from, to, mode, user) => {
		return (
			<ListItem className={classes.hiListItem}>
				<ListItemAvatar
					style={{
						minWidth: '30px',
					}}>
					<Avatar
						className={classes.hiAvatar}
						style={{
							backgroundColor: playerColorMap[user],
							color: theme.palette.getContrastText(playerColorMap[user]),
						}}>
						{user[0].toUpperCase()}{' '}
					</Avatar>
				</ListItemAvatar>
				<div className={classes.hiRoute}>
					{from} <img alt={mode} src={ticketImgMap[mode]} className={classes.img} /> {to}{' '}
				</div>
			</ListItem>
		);
	};

	const timeLineItem = (index, ele, last) => {
		return (
			<TimelineItem>
				<TimelineSeparator>
					<TimelineDot color="primary">
						<Avatar className={classes.turnAvatar}>{index + 1}</Avatar>
					</TimelineDot>
					{last ? null : <TimelineConnector />}
				</TimelineSeparator>
				<TimelineContent>
					<Paper elevation={3} className={classes.paper}>
						<List>
							{[1, 2, 3, 4, 5, 6].map((ele) => {
								return historyItem(82, 65, 'bus', 'blue');
							})}
						</List>
					</Paper>
				</TimelineContent>
			</TimelineItem>
		);
	};
	return (
		<Dialog open={open} onClose={onClose} maxWidth="sm" scroll="paper" fullWidth className={classes.root}>
			<DialogTitle className={classes.content}>TimeLine</DialogTitle>
			<DialogContent className={classes.content}>
				<Timeline align="alternate">
					{timeline.map((ele, index) => {
						return timeLineItem(index, ele, index === timeline.length - 1);
					})}
				</Timeline>
			</DialogContent>
		</Dialog>
	);
};
