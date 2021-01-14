import React, {useEffect, useState} from 'react';
import io from 'socket.io-client';
import {API_URL} from '../../config';

import {CreateRoom} from '../../components/CreateRoom';
import {JoinRoom} from '../../components/JoinRoom';

import {makeStyles} from '@material-ui/core/styles';
import {AppBar, Tabs, Tab, Paper, Typography, Box} from '@material-ui/core';

let socket;

function TabPanel(props) {
	const {children, value, index, ...other} = props;

	return (
		<Typography
			component="div"
			role="tabpanel"
			hidden={value !== index}
			id={`full-width-tabpanel-${index}`}
			{...other}>
			{value === index && <Box p={2}>{children}</Box>}
		</Typography>
	);
}

const useStyles = makeStyles((theme) => ({
	root: {
		marginTop: '5%',
		backgroundColor: '#333',
		borderRadius: '8px',
		maxWidth: 500,
		margin: 'auto',
		color: '#fff',
		marginBottom: '20px',

		[theme.breakpoints.down('xs')]: {
			marginLeft: '5%',
			marginRight: '5%',
			marginTop: '15%',
		},
	},
	indicator: {
		height: '100%',
		backgroundColor: '#333',
		zIndex: 0,
	},
	appbar: {
		backgroundColor: 'black',
		color: '#fff',
	},
	tab: {
		zIndex: 1,
	},
}));

export const Home = ({location}) => {
	const [value, setValue] = useState(0);
	const classes = useStyles();
	useEffect(() => {
		socket = io(API_URL);
		socket.emit('join', {name: 'HEY', pwd: 'ASF'});

		return () => {
			socket.emit('disconnect');
			socket.off();
		};
	}, [location.search]);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<Paper className={classes.root} elevation={5}>
			<AppBar position="static" elevation={3} classes={{root: classes.appbar}}>
				<Tabs
					value={value}
					onChange={handleChange}
					variant="fullWidth"
					aria-label="full width tabs example"
					classes={{indicator: classes.indicator}}>
					<Tab className={classes.tab} disableFocusRipple disableRipple label="Create Room" />
					<Tab className={classes.tab} disableFocusRipple disableRipple label="Join Room" />
				</Tabs>
			</AppBar>
			<TabPanel value={value} index={0}>
				<CreateRoom />
			</TabPanel>
			<TabPanel value={value} index={1}>
				<JoinRoom />
			</TabPanel>
		</Paper>
	);
};
