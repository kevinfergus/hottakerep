import React from 'react';
import { useObjectVal } from 'react-firebase-hooks/database';
import logo from './logo.svg';
import JoinRoom from './Components/PlayerControlPath/JoinRoom';
import WaitingRoom from './Components/HostPath/WaitingRoom';
import * as firebase from 'firebase';
import { db } from './firebase';
import './App.css';

// let prompts;

// fire.database().ref('prompts').once('value').then((snapshot) => {
// 	prompts = snapshot.val();
// });
// const [ prompt, loading, error ] = useObjectVal(db.ref('prompts'));
// const [ started, setStarted ] = useState(false);
// const [ home, setHome ] = useState(false);
// if (loading) return 'loading';
// if (error) return 'error”';

class App extends React.Component {
	constructor() {
		super();
		this.state = {
			started: false,
			code: Math.random().toString(36).substring(6, 10) + Math.random().toString(36).substring(6, 7)
		};
	}
	async handleClick(e) {
		e.preventDefault();
		try {
			await db.ref('games').child(`${this.state.code}`).set({
				state: {
					status: 'waitingRoom'
				}
			});
		} catch (error) {
			console.log(error);
		}
		this.setState({ started: true });
	}

	render() {
		return (
			<div>
				{!this.state.started ? (
					<div>
						{' '}
						<header className="App-header">
							<img src={logo} className="App-logo" alt="logo" />
							<h1>HOT TAKE</h1>
							<h2>
								Start a game:{' '}
								<input type="submit" value="New game" onClick={(e) => this.handleClick(e)} />
								<JoinRoom />
							</h2>
						</header>
					</div>
				) : (
					<WaitingRoom code={this.state.code} />
				)}
			</div>
		);
	}
}

export default App;
