const server = '127.0.0.1:27017'; // REPLACE WITH YOUR DB SERVER
const db_name = 'scotland_yard'; // REPLACE WITH YOUR DB NAME
const ip_address = ''; // REPLACE WITH YOUR IP ADDRESS
module.exports = {
	server: server,
	db_name: db_name,
	ip: ip_address,
	boolIp: false,
	port: 3000,
	backendUrl: 'http://localhost:3000',
	frontendUrl: 'http://localhost:3100', //REPLACE WITH YOUR FRONTEND URL
};
