import React, {useLayoutEffect, useState, useEffect} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {ToastProvider} from 'react-toast-notifications';
import {Navbar} from './components/Navbar';
import {Home} from './pages/Home';
import {NotFound} from './pages/NotFound';
import {Game} from './pages/Game';

export const App = () => {
	const [size, setSize] = useState(0);
	useEffect(() => {
		setSize(window.innerWidth);
	}, []);
	useLayoutEffect(() => {
		function updateSize() {
			setSize(window.innerWidth);
		}
		window.addEventListener('resize', updateSize);
		return () => window.removeEventListener('resize', updateSize);
	}, []);
	if (size < 1000 && false) {
		return <div>You cannot play this game on phone</div>;
	} else {
		return (
			<ToastProvider>
				<Router>
					<Navbar>
						<Switch>
							<Route exact path="/" component={Home} />
							<Route path="/game" component={Game} />
							<Route path="*" component={NotFound} />
						</Switch>
					</Navbar>
				</Router>
			</ToastProvider>
		);
	}
};
