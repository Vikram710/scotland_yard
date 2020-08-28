import React, {useLayoutEffect, useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {ToastProvider} from 'react-toast-notifications';
import {Navbar} from './components/Navbar';
import {Sample} from './pages/Sample';
import {NotFound} from './pages/NotFound';

function App() {
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
							<Route exact path="/" component={Sample} />
							<Route path="*" component={NotFound} />
						</Switch>
					</Navbar>
				</Router>
			</ToastProvider>
		);
	}
}

export default App;
