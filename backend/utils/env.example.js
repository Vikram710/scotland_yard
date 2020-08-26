const server = '127.0.0.1:27017'; // REPLACE WITH YOUR DB SERVER
const DB_NAME = 'scotland_yard'; // REPLACE WITH YOUR DB NAME
module.exports = {
	server: server,
	DB_NAME: DB_NAME,
	PORT: 3000,
	backendUrl: 'http://localhost:3000',
	frontendUrl: 'http://localhost:3100', //REPLACE WITH YOUR FRONTEND URL
};
