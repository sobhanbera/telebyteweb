import MainApp from "./MainApp";

import { BrowserRouter, Switch } from "react-router-dom";

import ErrorBoundary from "../components/ErrorBoundary/ErrorBoundary";

function App() {
	return (
		<ErrorBoundary>
			<BrowserRouter>
				<MainApp />
			</BrowserRouter>
		</ErrorBoundary>
	);
}

export default App;
