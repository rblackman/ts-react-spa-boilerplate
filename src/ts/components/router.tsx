import React, { FC } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Nav from './nav';
import HttpNotFound from './pages/404';
import About from './pages/about/app';
import Home from './pages/homepage/app';

const App: FC = () => (
	<Router>
		<Nav />
		<Switch>
			<Route exact path="/" component={Home} />
			<Route path="/about" component={About} />
			<Route component={HttpNotFound} />
		</Switch>
	</Router>
);

export default App;
