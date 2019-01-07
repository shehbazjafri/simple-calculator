import React, { Component } from "react";
// import { Provider } from "react-redux";
import "../css/App.css";
import Display from "../components/Display";
// import store from "../store";
class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			expression: "",
			currentValue: 0,
			result: ""
		};

		this.clearAll = this.clearAll.bind(this);
		this.evaluateResult = this.evaluateResult.bind(this);
		this.handleDecimal = this.handleDecimal.bind(this);
		this.handleNumber = this.handleNumber.bind(this);
		this.handleOperators = this.handleOperators.bind(this);
	}

	clearAll() {
		this.setState({
			expression: "",
			currentValue: 0,
			result: ""
		});
	}

	evaluateResult() {}

	handleDecimal() {}

	handleOperators(e) {
		const operator = e.target.innerText;
		console.log(operator);
	}

	handleNumber(e) {
		const num = e.target.innerText;
		const lastAdded = this.state.expression.slice(-1);
		if (!isNaN(lastAdded)) {
			this.setState({
				expression: this.state.expression + num,
				currentValue: this.state.expression + "" + num
			});
		} else {
			this.setState({
				expression: this.state.expression + num,
				currentValue: num
			});
		}
	}

	render() {
		return (
			// <Provider store={store}>
			<div className="calculator">
				<Display
					currentValue={this.state.currentValue}
					expression={this.state.expression}
				/>
				<button onClick={this.clearAll} id="clear" className="clear">
					AC
				</button>
				<button onClick={this.handleOperators} id="divide">
					/
				</button>
				<button onClick={this.handleOperators} id="multiply">
					X
				</button>
				<button onClick={this.handleNumber} id="seven">
					7
				</button>
				<button onClick={this.handleNumber} id="eight">
					8
				</button>
				<button onClick={this.handleNumber} id="nine">
					9
				</button>
				<button onClick={this.handleOperators} id="subtract">
					-
				</button>
				<button onClick={this.handleNumber} id="four">
					4
				</button>
				<button onClick={this.handleNumber} id="five">
					5
				</button>
				<button onClick={this.handleNumber} id="six">
					6
				</button>
				<button onClick={this.handleOperators} id="add">
					+
				</button>
				<button onClick={this.handleNumber} id="one">
					1
				</button>
				<button onClick={this.handleNumber} id="two">
					2
				</button>
				<button onClick={this.handleNumber} id="three">
					3
				</button>
				<button onClick={this.evaluateResult} id="equals" className="equals">
					=
				</button>
				<button onClick={this.handleNumber} id="zero" className="zero">
					0
				</button>
				<button onClick={this.handleDecimal} id="decimal">
					.
				</button>
			</div>
		);
	}
}

export default App;
