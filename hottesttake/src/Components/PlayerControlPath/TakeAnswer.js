import React from 'react';

export default class TakeAnswer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			answer: '',
			prompt: {},
			answered: false
		};
	}

	componentDidMount() {
		setTimeout(function() {}, 6000);
	}
	async handleSubmit(e) {
		e.preventDefault();
	}
	handleChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		});
	}
	handleClick(e) {
		e.preventDefault();
		for (let i = 0; i < this.props.prompts.length; i++) {
			if (this.props.prompts[i].players.players.player1.name === this.props.player) {
				this.setState({ prompt: this.props.prompts[i] });
				break;
			}
			if (this.props.prompts[i].players.players.player2.name === this.props.player) {
				this.setState({ prompt: this.props.prompts[i] });
				break;
			}
		}
	}

	render() {
		console.log(this.props.prompts, 'this.props.prompts');
		console.log('state in take answer', this.state);
		if (this.state.answer === '') {
			return (
				<button type="submit" onClick={(e) => this.handleClick(e)}>
					Click me!
				</button>
			);
		} else {
			return (
				<div className="App-header">
					Give me your hottest take on {this.state.prompt.prompt}
					<form onSubmit={(e) => this.handleSubmit(e)}>
						<input
							type="text"
							name="answer"
							value={this.state.answer}
							onChange={(e) => this.handleChange(e)}
						/>
					</form>
				</div>
			);
		}
	}
}
