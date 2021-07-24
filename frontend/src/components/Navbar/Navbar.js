import React, {useState} from 'react';
import logo from '../../assets/scotlandYard/logo.png';
import {AppBar, Toolbar, Typography, Button} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

import {Rules} from '../Rules';
import {ChangeName} from '../ChangeName';

const useStyles = makeStyles((theme) => ({
	title: {
		flexGrow: 1,
	},
	nav: {
		backgroundColor: '#333',
	},
	btn: {
		textTransform: 'none',
		fontSize: '1rem',
		'&:hover': {
			color: 'inherit',
			opacity: 0.75,
		},
	},
	logo: {
		width: '30px',
		height: '30px',
		verticalAlign: 'top',
	},
	children: {
		backgroundColor: 'black',
		position: 'absolute',
		top: '64px',
		bottom: '0px',
	},
}));

export const Navbar = (props) => {
	const [ruleModal, setRuleModal] = useState(false);
	const [changeNameModal, setChangeNameModal] = useState(false);
	const classes = useStyles();
	return (
		<>
			<AppBar position="static" className={classes.nav}>
				<Toolbar>
					<Typography variant="h6" className={classes.title}>
						<img alt="logo" src={logo} className={classes.logo} />
						Scotland Yard
					</Typography>
					<Button className={classes.btn} href="/game" color="inherit">
						Game
					</Button>
					<Button className={classes.btn} color="inherit" onClick={() => setRuleModal(true)}>
						Rules
					</Button>
					<Button className={classes.btn} color="inherit" onClick={() => setChangeNameModal(true)}>
						{localStorage.getItem('user_id') ? localStorage.getItem('name') : 'Name'}
					</Button>
				</Toolbar>
			</AppBar>
			<div className={classes.children}>{props.children}</div>
			<Rules open={ruleModal} onClose={() => setRuleModal(false)} />
			<ChangeName
				open={changeNameModal}
				setChangeNameModal={setChangeNameModal}
				onClose={() => setChangeNameModal(false)}
			/>
		</>
	);
};
