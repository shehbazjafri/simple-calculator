import React from "react";

class Display extends React.Component {
	render() {
		return (
			<div id="display-panel" className="display">
				<h2>{this.props.expression}</h2>
				<div id="display">
					<h3>{this.props.currentValue}</h3>
				</div>
			</div>
		);
	}
}

export default Display;
