import React from 'react';
import {gitUser} from './api';

var Card = React.createClass({
	getInitialState: function() {
		return {};
	},
	componentDidMount: function() {
		gitUser(this.props.login).then((data) => {
			this.setState(data);
		});
	},
	render: function() {
		return (
			<div>
				<img src={this.state.avatar_url} width="80" />
				<h3>{this.state.name}</h3>
				<hr/>
			</div>
		);
	}
});

var Form = React.createClass({
	handleSubmit: function (e) {
		e.preventDefault();
		var loginInput = React.findDOMNode(this.refs.login);
		this.props.addCard(loginInput.value);
		loginInput.value = '';
	},
	render: function() {
		return (
			<form onSubmit={this.handleSubmit}>
				<input placeholder="github login" ref="login" />
				<button>Add</button>
			</form>
		);
	}
});

var Main = React.createClass({
	getInitialState: function() {
		return {
			logins: []
		};
	},
	addCard: function (card) {
		this.setState({
			logins: this.state.logins.concat(card)
		});
	},
	render: function() {
		var cards = this.state.logins.map((login, i) => <Card key={i} login={login} />);
		return (
			<div>
				<Form addCard={this.addCard}/>
				{cards}
			</div>
		);
	}
});

React.render(<Main />, document.getElementById('app'));
