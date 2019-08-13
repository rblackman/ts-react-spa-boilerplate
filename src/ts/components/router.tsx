import React, { FC } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Nav from './nav';
import HttpNotFound from './pages/404';
import About from './pages/about/app';
import Home from './pages/homepage/app';
import Page2 from './pages/page2/app';

const App: FC = () => (
	<Router>
		<Nav />
		<main>
			<Switch>
				<Route exact path="/" component={Home} />
				<Route path="/about" component={About} />
				<Route path="/page2" component={Page2} />
				<Route component={HttpNotFound} />
			</Switch>
		</main>
	</Router>
);

export default App;
