import taxi from '../assets/scotlandYard/tickets/taxi.png';
import bus from '../assets/scotlandYard/tickets/bus.png';
import underground from '../assets/scotlandYard/tickets/underground.png';
import black from '../assets/scotlandYard/tickets/black.png';
import {API_URL} from '../config';

export const ticketImgMap = {
	taxi,
	bus,
	underground,
	black,
};
export const playerColorMap = {
	Red: '#DC143C',
	Blue: '#ADD8E6',
	Purple: '#800080',
	Green: '#00FF7F',
	Yellow: '#ebce36',
	'Mr.X': '#333',
};

export const leftPad = (number, targetLength) => {
	var output = number + '';
	while (output.length < targetLength) {
		output = '0' + output;
	}
	return output;
};

export const dataFetch = async (url, data = {}, method = 'POST') => {
	const apiConfig = {
		method: method,
		headers: {'Content-type': 'application/json; charset=UTF-8'},
		credentials: 'same-origin',
		body: JSON.stringify(data),
	};

	return fetch(API_URL + url, apiConfig)
		.then(function (response) {
			return response.json().then((json) => {
				if (json.status_code === 401) {
					window.location.href = '/';
					localStorage.clear();
				}
				return {json, status: response.status}; //Gets cascaded to the next then block
			});
		})
		.catch(function (error) {
			throw error; //gets caught in the higher catch block
		});
};
