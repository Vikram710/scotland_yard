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
import {playerColorMap, ticketImgMap, dataFetch} from '../../utils';
import {useToasts} from 'react-toast-notifications';

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
	playerAvatar: {
		minWidth: '30px',
	},
}));

export const GameTimeLine = (props) => {
	const classes = useStyles();
	const theme = useTheme();
	const {open, onClose} = props;
	const [timeline, setTimeline] = useState([]);
	const {addToast} = useToasts();

	useEffect(() => {
		let data = {roomId: localStorage.getItem('roomId')};
		if (open) {
			dataFetch('game/get_timeline', data)
				.then(({json, status}) => {
					if (status === 200) setTimeline(json.message);
					else addToast('Error in fetching timeline', {appearance: 'error', autoDismiss: true});
				})
				.catch((error) => {
					console.log(error);
					addToast('Internal Server Error', {appearance: 'error', autoDismiss: true});
				});
		}
	}, [open]); // eslint-disable-line react-hooks/exhaustive-deps

	const historyItem = (from, to, mode, user) => {
		return (
			<ListItem className={classes.hiListItem}>
				<ListItemAvatar className={classes.playerAvatar}>
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
