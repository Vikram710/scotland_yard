import React, {useState} from 'react';
import clsx from 'clsx';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import {
	Drawer,
	AppBar,
	Toolbar,
	List,
	CssBaseline,
	Typography,
	Divider,
	IconButton,
	ListItem,
	ListItemText,
	ListItemIcon,
} from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import MenuIcon from '@material-ui/icons/Menu';
import ChatIcon from '@material-ui/icons/Chat';
import TimelineIcon from '@material-ui/icons/Timeline';
import GavelIcon from '@material-ui/icons/Gavel';
import HomeIcon from '@material-ui/icons/Home';
import PersonIcon from '@material-ui/icons/Person';
import logo from '../../assets/scotlandYard/logo.png';
import {Rules} from '../Rules';
import {ChangeName} from '../ChangeName';
import {GameTimeLine} from '../GameTimeLine';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
	},
	appBar: {
		zIndex: theme.zIndex.drawer + 1,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		backgroundColor: '#333',
	},
	appBarShift: {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	menuButton: {
		marginRight: 36,
	},
	hide: {
		display: 'none',
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0,
		whiteSpace: 'nowrap',
	},
	drawerOpen: {
		width: drawerWidth,
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	drawerClose: {
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		overflowX: 'hidden',
		width: theme.spacing(7) + 1,
		[theme.breakpoints.up('sm')]: {
			width: theme.spacing(9) + 1,
		},
	},
	toolbar: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'flex-end',
		padding: theme.spacing(0, 1),
		// necessary for content to be below app bar
		...theme.mixins.toolbar,
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing(3),
	},
	logo: {
		width: '30px',
		height: '30px',
		verticalAlign: 'top',
		marginRight: '10px',
	},
	children: {
		backgroundColor: 'black',
		position: 'absolute',
		top: '64px',
		bottom: '0px',
		left: '73px',
		right: 0,
	},
	username: {
		flex: 1,
		textAlign: 'center',
	},
}));

export const Navbar = (props) => {
	const classes = useStyles();
	const theme = useTheme();
	const [open, setOpen] = useState(false);
	const [ruleModal, setRuleModal] = useState(false);
	const [changeNameModal, setChangeNameModal] = useState(false);
	const [gameTimeLineModal, setGameTimeLineModal] = useState(false);

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};

	return (
		<div className={classes.root}>
			<CssBaseline />
			<AppBar
				position="fixed"
				className={clsx(classes.appBar, {
					[classes.appBarShift]: open,
				})}>
				<Toolbar>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						onClick={handleDrawerOpen}
						edge="start"
						className={clsx(classes.menuButton, {
							[classes.hide]: open,
						})}>
						<MenuIcon />
					</IconButton>
					<Typography variant="h6" className={classes.title}>
						<img alt="logo" src={logo} className={classes.logo} />
						Scotland Yard
					</Typography>
				</Toolbar>
			</AppBar>
			<Drawer
				variant="permanent"
				className={clsx(classes.drawer, {
					[classes.drawerOpen]: open,
					[classes.drawerClose]: !open,
				})}
				classes={{
					paper: clsx({
						[classes.drawerOpen]: open,
						[classes.drawerClose]: !open,
					}),
				}}>
				<div className={classes.toolbar}>
					<div className={classes.username}>UserName</div>
					<IconButton onClick={handleDrawerClose}>
						{theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
					</IconButton>
				</div>
				<Divider />
				<List>
					<ListItem button>
						<ListItemIcon>
							<HomeIcon />
						</ListItemIcon>
						<ListItemText primary="Home" />
					</ListItem>
					<ListItem button onClick={() => setRuleModal(true)}>
						<ListItemIcon>
							<GavelIcon />
						</ListItemIcon>
						<ListItemText primary="Rules" />
					</ListItem>
					<ListItem button onClick={() => setChangeNameModal(true)}>
						<ListItemIcon>
							<PersonIcon />
						</ListItemIcon>
						<ListItemText primary="Name" />
					</ListItem>
				</List>
				<Divider />
				{localStorage.getItem('roomId') ? (
					<List>
						<ListItem button>
							<ListItemIcon>
								<ChatIcon />
							</ListItemIcon>
							<ListItemText primary="Chat" />
						</ListItem>
						<ListItem button onClick={() => setGameTimeLineModal(true)}>
							<ListItemIcon>
								<TimelineIcon />{' '}
							</ListItemIcon>
							<ListItemText primary="History" />
						</ListItem>
					</List>
				) : null}
			</Drawer>
			<div className={classes.children}>{props.children}</div>
			<Rules open={ruleModal} onClose={() => setRuleModal(false)} />
			<GameTimeLine open={gameTimeLineModal} onClose={() => setGameTimeLineModal(false)} />
			<ChangeName
				open={changeNameModal}
				setChangeNameModal={setChangeNameModal}
				onClose={() => setChangeNameModal(false)}
			/>
		</div>
	);
};
