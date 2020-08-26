import React from 'react';
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import {ToastProvider} from 'react-toast-notifications';
import {Sample} from './pages/Sample';

function App() {
	return (
		<ToastProvider>
			<Router>
				<Switch>
					<Redirect exact from="/" to="/sample" />
					<Route exact path="/sample" component={Sample} />
				</Switch>
			</Router>
		</ToastProvider>
	);
}

export default App;
