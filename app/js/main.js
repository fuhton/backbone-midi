import React from 'react'
import TEXTINPUT from './textinput';

class App extends React.Component {
	constructor () {
		super()
		this.state = {
			n: 0,
			value: '',
		}
	}
	render () {
		return <div>
		<TEXTINPUT label="Key" value={this.state.value} />
		<TEXTINPUT label="Value" value={this.state.value} />
		<h1>clicked {this.state.n} timess</h1>
		<button onClick={this.handleClick.bind(this)}>click me!</button>
		</div>
	}
	handleClick () {
		this.setState({ n: this.state.n + 1 })
	}
}
React.render(<App />, document.querySelector('#main'))
