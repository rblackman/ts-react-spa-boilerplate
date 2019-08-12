#!/usr/bin/env node

const chalk = require('chalk');
const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

"use strict";
function write(text, color, newLine) {
	if (color === 'red') {
		process.stdout.write(chalk.red(text));
	}
	else if (color === 'green') {
		process.stdout.write(chalk.green(text));
	}
	else if (color === 'blue') {
		process.stdout.write(chalk.blue(text));
	}
	else {
		process.stdout.write(text);
	}
	if (newLine === true || newLine === undefined) {
		process.stdout.write(`\n`);
	}
	process.stdin.resume();
}

function ask(question, defaultValue, defaultDisplay) {
	return new Promise((resolve) => {
		const defaultText = defaultDisplay ? defaultDisplay : defaultValue;
		const prompt = `${question} [${defaultText}]: `;
		write(`\n\n${prompt}`, 'white', false);
		process.stdin.on('data', pData => {
			const answer = (pData.toString().trim() || defaultValue);
			resolve(answer);
		});
	});
}

async function askBool(question, defaultValue) {
	const dv = defaultValue ? 'y' : 'n';
	const display = defaultValue ? 'Y/n' : 'y/N';
	const answer = await ask(question, dv, display);
	return answer.toLowerCase() === 'y';
}

function deleteFileInCurrentDir(file) {
	return new Promise((resolve, reject) => {
		fs.unlink(path.join(__dirname, file), err => reject(new Error(err)));
		resolve();
	});
}

var deleteFolderRecursive = function (path) {
	if (fs.existsSync(path)) {
		fs.readdirSync(path).forEach(function (file, index) {
			var curPath = path + "/" + file;
			if (fs.lstatSync(curPath).isDirectory()) { // recurse
				deleteFolderRecursive(curPath);
			} else { // delete file
				fs.unlinkSync(curPath);
			}
		});
		fs.rmdirSync(path);
	}
};

function executeCommand(command) {
	return new Promise((resolve, reject) => {
		exec(command, (err, stdout) => {
			if (err) {
				reject(new Error(err));
			} else {
				resolve(stdout);
			}
		});
	});
}

function useRealGitIgnore() {
	return new Promise((resolve, reject) => {
		deleteFileInCurrentDir('.gitignore').then(() => {
			fs.rename('.gitignore.release', '.gitignore', err => {
				if (err) {
					reject(new Error(err));
				}
				else {
					resolve();
				}
			});
		});

	});
}

async function handleGit() {
	const gitPath = './.git';
	const hasGit = fs.existsSync(gitPath);
	if (hasGit) {
		write('existing git repository');
	} else {
		write('no git repository');
	}

	const answer = await askBool('Create a new git repository?', true);

	if (answer) {
		if (hasGit) {
			write('Deleting old git');
			deleteFolderRecursive(gitPath);
		}
		await useRealGitIgnore();

		const initResult = await executeCommand('git init');
		write(initResult);
		const addResult = await executeCommand('git add -A');
		write(addResult);
		const commitResult = await executeCommand('git commit -m "Using template https://github.com/rblackman/ts-react-spa-boilerplate"');
		write(commitResult);

	} else {
		write('Not touching git');
	}

}


(async () => {
	process.stdin.resume();
	process.stdin.setEncoding('utf8');
	write('\nBeginning installation...\n');

	await handleGit();

	await deleteFileInCurrentDir('install.js');

	write('done', 'blue');
	process.exit(0);

})();
