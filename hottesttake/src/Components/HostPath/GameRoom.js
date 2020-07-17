import React from 'react';
import { db } from '../../firebase';

class GameRoom extends React.Component {
	constructor() {
		super();
		this.state = {
			status: '',
			pairs: []
		};
	}
	async componentDidMount() {
		try {
			db.ref(`games/${this.props.code}/state/status`).on('value', (snapshot) => {
				this.setState({ status: snapshot.val() });
			});
		} catch (error) {
			console.log(error);
		}

		let pairs = [];

		let pairObj = {};
		console.log(this.props.players, 'players in game room');

		const players = this.props.players;

		for (let i = 0; i < players.length; i++) {
			if (i % 2 === 0) {
				pairObj.player1 = players[i];
			} else {
				pairObj.player2 = players[i];
				pairs.push(pairObj);
				pairObj = {};
			}
		}
		console.log(pairs, 'pairs in game room componenddidmount');
		for (let i = 0; i < pairs.length; i++) {
			db.ref(`games/${this.props.code}/state/prompts/${i}`).child('players').set({
				players: pairs[i]
			});
		}
	}
	render() {
		if (this.state.status === '') {
			return <div className="App-header">Loading</div>;
		} else if (this.state.status === 'answering') {
			return <div className="App-header">Look at your player controls for directions</div>;
		}
	}
}

export default GameRoom;
