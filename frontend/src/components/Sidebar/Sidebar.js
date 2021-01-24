import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
const useStyles = makeStyles({
	list: {
		width: 250,
		height: 'auto',
	},
	fullList: {
		width: 'auto',
		height: 250,
	},
	messageArea: {
		width: '100%',
		height: '10%',
	},
	chats: {
		padding: '5px',
	},
	messages: {
		border: '5px solid green',
		minHeight: '2%',
	},
	inputArea: {
		width: '100%',
	},
	button : {
		border: '2px solid black'
	}
});

export const Sidebar = ({message,messages,setMessage,sendMessage}) => {
	const classes = useStyles();
	const [state, setState] = React.useState({
		top: false,
		left: false,
		bottom: false,
		right: false,
	});
	const toggleDrawer = (anchor, open) => (event) => {
		if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
			return;
		}
		setState({...state, [anchor]: open});
	};

	const list = (anchor) => (
		<div
			className={clsx(classes.list, {
				[classes.fullList]: anchor === 'top' || anchor === 'bottom',
			})}
			role="presentation"
			onClick={toggleDrawer(anchor, true)}
			onKeyDown={toggleDrawer(anchor, true)}>
				<div className={classes.inputArea}>
			<TextareaAutosize onChange={({target: {value}}) => setMessage(value)} rowsMin={1} rowsMax={1} placeholder="Enter your text" value={message}/>
			<Button className={classes.button} onClick={e => sendMessage(e)}>
				Enter
			</Button>
			</div>
				<div 
				className={classes.messageArea}  >
				{messages.reverse().map((text, index) => (
					<div className={classes.chats}>
					<div key={index} className={classes.messages}>
						{text.user}
						<br />
						{text.text}
					</div>
					</div>
				))}
				</div>
			
		</div>
	);

	return (
		<div>
			{['left', 'right', 'top', 'bottom'].map((anchor) => (
				<React.Fragment key={anchor}>
					<Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
					<SwipeableDrawer
						anchor={anchor}
						open={state[anchor]}
						onClose={toggleDrawer(anchor, false)}
						onOpen={toggleDrawer(anchor, true)}>
						{list(anchor)}
					</SwipeableDrawer>
				</React.Fragment>
			))}
		</div>
	);
};
