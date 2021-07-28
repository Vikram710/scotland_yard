import React from 'react';
import {Button, Dialog} from '@material-ui/core';
import DialogContent from '@material-ui/core/DialogContent';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	content: {
		textAlign: 'center',
	},
}));

export const GameOver = (props) => {
	const {open, exitGame, winner} = props;
	const classes = useStyles();
	return (
		<Dialog open={open} maxWidth="sm">
			<DialogContent className={classes.content}>
				<div>
					<h1>Game Over</h1>
					<h2>{winner} Won</h2>
				</div>
				<Button variant="contained" color="primary" onClick={exitGame}>
					Exit Game
				</Button>
			</DialogContent>
		</Dialog>
	);
};
