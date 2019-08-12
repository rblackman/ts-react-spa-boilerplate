import React, { FC } from 'react';
import { Link, NavLink } from 'react-router-dom';

const Header: FC = () => (
	<header>
		<nav>
			<h1>
				<Link to="/" className="home-link" title="Home">TS React SPA Boilerplate</Link>
			</h1>
			<ul>
				<li><NavLink to="/about" className="nav-item" activeClassName="nav-item active">About</NavLink></li>
			</ul>
		</nav>
	</header>
);

export default Header;
