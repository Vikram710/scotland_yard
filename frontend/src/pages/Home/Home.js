import React, {useEffect} from 'react';
import {Tab, Tabs} from 'react-bootstrap';
import io from 'socket.io-client';
import {API_URL} from '../../config';

import {CreateRoom} from '../../components/CreateRoom';
import {JoinRoom} from '../../components/JoinRoom';

const styles = {
	tabs: {textAlign: 'center'},
	root: {maxWidth: '300px', margin: 'auto'},
};
let socket;

export const Home = ({location}) => {
	useEffect(() => {
		socket = io(API_URL);
		socket.emit('join', {name: 'HEY', pwd: 'ASF'});

		return () => {
			socket.emit('disconnect');
			socket.off();
		};
	}, [location.search]);

	return (
		<div style={styles.root}>
			<Tabs defaultActiveKey="createRoom" id="uncontrolled-tab" style={styles.tabs}>
				<Tab eventKey="createRoom" title="Create Room" tabClassName="w-50">
					<CreateRoom />
				</Tab>
				<Tab eventKey="joinRoom" title="Join Room" tabClassName="w-50">
					<JoinRoom />
				</Tab>
			</Tabs>
		</div>
	);
};
