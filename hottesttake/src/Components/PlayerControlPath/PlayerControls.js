import React, { useState } from 'react';
import TakeAnswer from './TakeAnswer';
import { db } from '../../firebase';

class PlayerControls extends React.Component {
	constructor() {
		super();
		this.state = {
			status: '',
			prompts: [],
			promptToAnswer: 'Paris'
		};
	}

	async componentDidMount() {
		try {
			db.ref(`games/${this.props.code}`).on('value', (snapshot) => {
				let game = [];
				snapshot.forEach((snap) => {
					game.push(snap.val());
				});
				game = game[0];
				this.setState({ status: game.status });
			});
		} catch (error) {
			console.log(error);
		}
		try {
			db.ref(`games/${this.props.code}/state/prompts`).on('value', (snapshot) => {
				let promptsOnDb = [];
				snapshot.forEach((snap) => {
					promptsOnDb.push(snap.val());
				});
				this.setState({ prompts: promptsOnDb });
				this.setState({ promptToAnswer: promptsOnDb[1] });
			});
		} catch (error) {
			console.log(error);
		}

		for (let i = 0; i < this.state.prompts; i++) {
			if (this.state.prompts[i].state.players) {
			}
		}
	}
	render() {
		if (this.state.status === 'waitingRoom') {
			return <div>You're all sit, hang out till everyone joins</div>;
		} else if (this.state.status === 'answering') {
			return <TakeAnswer player={this.props.player} prompts={this.state.prompts} wait={3000} />;
		} else {
			return <div>Let's get going!</div>;
		}
	}
}
export default PlayerControls;
