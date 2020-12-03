import MainApp from "./MainApp";
import ErrorBoundary from "../components/ErrorBoundary/ErrorBoundary";

function App() {
	return (
		<ErrorBoundary>
			<MainApp />
		</ErrorBoundary>
	);
}

export default App;
