import ErrorBoundary from "../components/ErrorBoundary/ErrorBoundary";
import Main from "../components/Main";
import { BrowserRouter } from "react-router-dom";

function App() {
	return (
		<BrowserRouter>
			<ErrorBoundary>
				<Main />
			</ErrorBoundary>
		</BrowserRouter>
	);
}

export default App;
