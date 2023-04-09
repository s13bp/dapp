/* eslint-disable prettier/prettier */
import './App.css';

import React, { useEffect, useState } from 'react';
import Mintzy from '../MintButton/Mintzy'
import { Login } from '../Login';
import { Profile } from '../Profile/Profile';
import { Auth } from '../types';
import logo from './LOGO.png';
import Web3 from 'web3';

const LS_KEY = 'login-with-metamask:auth';

interface State {
	auth?: Auth;
}

export const App = (): JSX.Element => {
	const [state, setState] = useState<State>({});

	useEffect(() => {
		// Access token is stored in localstorage
		const ls = window.localStorage.getItem(LS_KEY);
		const auth = ls && JSON.parse(ls);
		setState({ auth });
	}, []);

	const handleLoggedIn = (auth: Auth) => {
		localStorage.setItem(LS_KEY, JSON.stringify(auth));
		setState({ auth });
	};

	const handleLoggedOut = () => {
		localStorage.removeItem(LS_KEY);
		setState({ auth: undefined });
	};

	const { auth } = state;

	return (
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />

			</header>
			<div className="App-intro">
				{auth ? (
					<><Profile auth={auth} onLoggedOut={handleLoggedOut} />
					<Mintzy /></>
				) : (
					<Login onLoggedIn={handleLoggedIn} />
				)}
			</div>
		</div>
	);
};
