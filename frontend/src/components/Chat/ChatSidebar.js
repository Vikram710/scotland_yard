import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {SwipeableDrawer, Container, Grid, Card} from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';

const useStyles = makeStyles((theme) => ({
	drawer: {
		width: '360px',
	},
	root: {
		flexGrow: 1,
		backgroundColor: '#ccd3f0',
		height: '100vh',
	},
	noPad: {
		margin: 0,
		padding: 0,
	},
	appBar: {
		top: 'auto',
		bottom: 0,
		backgroundColor: '#333',
		position: 'absolute',
		width: '100%',
		height: '50px',
	},
	button: {
		borderRadius: '15px',
		margin: 'auto',
		width: '40%',
		backgroundColor: '#1976d2',
		color: 'white',
	},
	cardr: {
		padding: '10px',
		color: 'white',
		backgroundColor: '#056162',
	},
	cardl: {
		padding: '10px',
		backgroundColor: '#262d31',
		color: 'white',
	},
	chatCont: {
		backgroundColor: 'black',
		maxHeight: `${window.innerHeight - 50}px`,
		overflow: 'auto',
		padding: '10px 10px 0px 10px',
		display: 'flex',
		flexDirection: 'column-reverse',
	},
	chatHolder: {
		paddingBottom: '10px',
	},
	mark: {
		display: 'inline-block',
		width: '12px',
		height: '12px',
		borderRadius: '50%',
		backgroundColor: 'green',
	},
    chatInputBox:{
        backgroundColor:'black',
        width:'100%',
        height:'100%',
        display:'flex',
        padding:' 6px 10px',
        justifyContent:'space-evenly'
    },
    chatInput:{
        resize:'none',
        backgroundColor:'#333',
        color:'white'
    },
    sendBtn:{
        borderRadius:'50%',
        backgroundColor:'#056162',
        color:'white',
        height:'40px',
        width:'40px',
        border:'none'
    }
}));

export const ChatSidebar = (props) => {
	const classes = useStyles();
	const {open, onClose, data, setData} = props;
	return (
		<>
			<SwipeableDrawer anchor="right" open={open} className={classes.drawer} onClose={() => onClose(false)}>
				<div className={classes.drawer}>
					<Container className={classes.chatCont}>
						{data.map((item) => {
							if (item % 2) {
								return (
									<Grid
										container
										align="left"
										direction="column"
										alignItems="flex-start"
										className={classes.chatHolder}>
										<Grid item xs={9}>
											<Card className={classes.cardr}>
												<div>
													HEAD <span className={classes.mark}></span>
												</div>
												<div>hey this is a text message</div>
											</Card>
										</Grid>
									</Grid>
								);
							} else {
								return (
									<Grid
										container
										align="right"
										direction="column"
										alignItems="flex-end"
										className={classes.chatHolder}>
										<Grid item xs={9}>
											<Card className={classes.cardl}>
												<div>hey this is a text message</div>{' '}
											</Card>
										</Grid>
									</Grid>
								);
							}
						})}
					</Container>
					<div className={classes.appBar}>
						<div className={classes.chatInputBox}>
							<div >
								<textarea
                                    className={classes.chatInput}
									id="message"
									name="message"
									rows="2"
									cols="30"
									placeholder="Type your message here"></textarea>
							</div>
							<button className={classes.sendBtn}>
								<span className={classes.sendIcon}><SendIcon/></span>
							</button>
						</div>
					</div>
				</div>
			</SwipeableDrawer>
		</>
	);
};
