import React, {useState} from 'react';
import {Navbar as NavbarBootstrap, Nav} from 'react-bootstrap';
import logo from '../../assets/scotlandYard/logo.png';

import {Rules} from '../Rules';
import {ChangeName} from '../ChangeName';

export const Navbar = (props) => {
	const [ruleModal, setRuleModal] = useState(false);
	const [changeNameModal, setChangeNameModal] = useState(false);
	return (
		<div>
			<NavbarBootstrap collapseOnSelect expand="lg" bg="dark" variant="dark">
				<NavbarBootstrap.Brand href="/">
					<img alt="logo" src={logo} width="30" height="30" className="d-inline-block align-top" />
					Scotland Yard
				</NavbarBootstrap.Brand>
				<NavbarBootstrap.Toggle aria-controls="responsive-navbar-nav" />
				<NavbarBootstrap.Collapse id="responsive-navbar-nav">
					<Nav className="mr-auto"></Nav>
					<Nav>
						<Nav.Link onClick={() => setRuleModal(true)}>Rules</Nav.Link>
						<Nav.Link onClick={() => setChangeNameModal(true)}>Name</Nav.Link>
					</Nav>
				</NavbarBootstrap.Collapse>
			</NavbarBootstrap>

			<div>
				<div>{props.children}</div>
			</div>
			<Rules show={ruleModal} onHide={() => setRuleModal(false)} />
			<ChangeName show={changeNameModal} onHide={() => setChangeNameModal(false)} />
		</div>
	);
};
