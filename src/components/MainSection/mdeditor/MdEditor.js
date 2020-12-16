import React, { Component } from "react";
import styles from "../../elements/styles/style";

import ContentEditable from "react-contenteditable";
import ReactMarkdown from "react-markdown";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomDark as dark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";

class MdEditor extends Component {
	constructor() {
		super();
		this.contentEditable = React.createRef();
		this.state = { code: "Hello, World!" };
	}

	handleChange = (evt) => {
		this.setState({ code: evt.target.value });
		console.log(this.state.code);
	};

	codeChanged = (editor, data, value) => {
		this.setState({
			code: value,
		});
	};

	render() {
		return <div></div>;
	}
}

export default MdEditor;
