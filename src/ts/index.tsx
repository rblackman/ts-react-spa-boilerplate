import React from 'react';
import ReactDom from 'react-dom';
import '../scss/index.scss';
import Router from './components/router';

(() => {
	const htmlElementName: string = 'app';
	const jsxElement: JSX.Element = <Router />;
	const htmlElement: HTMLElement | null = document.getElementById(htmlElementName);
	if (htmlElement) {
		ReactDom.render(jsxElement, htmlElement);
	} else {
		throw new Error(`Can\'t find HTML element: ${htmlElementName}`);
	}
})();
