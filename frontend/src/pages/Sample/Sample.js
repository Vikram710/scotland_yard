import React, {useEffect} from 'react';
import {Alert} from 'react-bootstrap';
import io from 'socket.io-client';
import {API_URL} from '../../config';

let socket;

export const Sample = ({location}) => {
	let end = API_URL;

	useEffect(() => {
		socket = io(end);
		socket.emit('join', {name: 'HEY', pwd: 'ASF'});

		return () => {
			socket.emit('disconnect');
			socket.off();
		};
	}, [end, location.search]);
	return (
		<Alert key="info" variant="info">
			Sample
		</Alert>
	);
};
