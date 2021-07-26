import React, {useEffect, useState} from 'react';
import {Dialog, DialogContent, DialogTitle, Paper, List, ListItem, Avatar, ListItemAvatar} from '@material-ui/core';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import {
	Timeline,
	TimelineItem,
	TimelineSeparator,
	TimelineConnector,
	TimelineDot,
	TimelineContent,
} from '@material-ui/lab';
import {API_URL} from '../../config';
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
	const [timeline, setTimeline] = useState([]);

	useEffect(() => {
		let data = {roomId: localStorage.getItem('roomId')};
		const fetchTimeline = async () => {
			try {
				let response = await fetch(API_URL + 'game/get_timeline', {
					method: 'POST',
					body: JSON.stringify(data),
					headers: {'Content-type': 'application/json; charset=UTF-8'},
				});
				response = await response.json();
				console.log(response);
				setTimeline(response.message);
			} catch (error) {
				console.log(error);
			}
		};
		if (open) fetchTimeline();
	}, [open]);

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

	const timeLineItem = (index, rn, last) => {
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
							{timeline[rn].map((ele) => {
								return historyItem(
									ele.fromPosition,
									ele.toPosition,
									ele.ticketUsed.name,
									ele.madeBy.character.name
								);
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
					{Object.keys(timeline).map((rn, index) => {
						return timeLineItem(index, rn, index === Object.keys(timeline).length - 1);
					})}
				</Timeline>
			</DialogContent>
		</Dialog>
	);
};
