import React from 'react'
import newId from './utils/label';

class TEXTINPUT extends React.Component {
	componentWillMount() {
		this.id = newId();
	}
	render () {
		return <div>
			<label htmlFor={this.id}>{this.props.label}</label>
			<input name={this.id} type="text" value={this.props.value} />
		</div>
	}
}

module.exports = TEXTINPUT;
