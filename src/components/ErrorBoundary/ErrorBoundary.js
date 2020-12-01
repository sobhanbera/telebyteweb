import React, { Component } from "react";

class ErrorBoundary extends Component {
	constructor() {
		super();
		this.state = {
			errorFound: false,
			error: "",
			errorLog: "",
		};
	}

	static getDerivedStateFromError(error) {
		// Update state so the next render will show the fallback UI.
		return { errorFound: true };
	}

	componentDidCatch(err, errlog) {
		this.setState({
			errorFound: true,
			error: err,
			errorLog: errlog,
		});
	}

	render() {
		if (this.state.errorFound) {
			return <div>Error Occurred Page TODO.</div>;
		}
		return this.props.children;
	}
}

export default ErrorBoundary;
