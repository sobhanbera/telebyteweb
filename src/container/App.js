import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary';
import Main from '../components/Main';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import PrivacyPolicy from '../components/sections/PrivacyPolicy';
import TermsAndCondition from '../components/sections/Terms';

function App() {
	return (
		<BrowserRouter>
			<ErrorBoundary>
				<Switch>
					{/* PRIVACY POLICY ROUTE */}
					<Route exact path='/privacy' component={() => <PrivacyPolicy />} />

					<Route exact path='/terms' component={() => <TermsAndCondition />} />

					<Route path='*' component={() => <Main />} />
				</Switch>
			</ErrorBoundary>
		</BrowserRouter>
	);
}

export default App;
