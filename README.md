# Scotland Yard
A web version of board game scotland yard. Scotland Yard is a board game in which a team of players controlling different detectives cooperate to track down a player controlling a criminal as they move around a board representing the streets of London

## Developing

### Built With

React Js, Node Js and Material UI

### Prerequisites

npm >= 6.14

### Setting up Dev
```shell
git clone https://github.com/vikram710/scotland_yard
cd scotland_yard
```
API
```shell
cd backend
cp utils/env.example.js utils/env.js
#Replace the values in env.js
npm install
npm start
```

Frontend 
```shell
cd frontend
cp src/config.example.js src/config.js
#Replace the values in config.js
npm install
npm start
```

Database Seed
```shell
cd scripts
#Follow the order
python3 transport_mode.py
python3 position.py
python3 routes.py
```

### General Coding Advice

- Follow the coding style given below
- Maintain the project structure (pages, components etc).
- Use ES6+ features to write clean code. Especially async await and arrow functions
- When you install a new dependency always use ```$ npm install --save <package_name> ```
- Before commiting format with ```$ npm run fmt ```
- _Update README_

