import React, { Component } from 'react';
import styles from '../elements/styles/style';

import { Switch, Route } from 'react-router-dom';
import Dashboard from './dashboardSection/Dashboard';
import Explore from './exploreSection/Explore';
import Tools from './toolsSection/Tools';
import Setting from './settingsSection/Settings';
import Profile from './profileSection/decoProfile/Profile';
import OthersProfile from './profileSection/othersProfileSection/OthersProfile';
import Support from './supportSection/Support';
import About from './aboutSection/About';
import MdEditor from './mdeditor/MdEditor';

class MainSection extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<div className={styles.MainContentStart}>
				<Switch>
					{/* EXTRA COMPONENTS ROUTINGS */}
					<Route exact path='/md/editor' component={() => <MdEditor />} />

					{/* APP ITSELF */}
					<Route
						exact
						path='/explore'
						component={() => <Explore userdata={this.props.userdata} />}
					/>

					<Route exact path='/tools' component={Tools} />

					<Route
						exact
						path='/setting'
						component={() => (
							<Setting
								userdata={this.props.userdata}
								currentUser={this.props.currentUser}
							/>
						)}
					/>

					<Route
						exact
						path='/profile'
						component={() => <Profile userdata={this.props.userdata} />}
					/>
					<Route exact path='/users/*' component={() => <OthersProfile />} />

					<Route exact path='/support' component={Support} />
					<Route exact path='/about' component={About} />

					<Route
						exact
						path='/dashboard'
						component={() => <Dashboard userdata={this.props.userdata} />}
					/>
					<Route
						exact
						path='/'
						component={() => <Dashboard userdata={this.props.userdata} />}
					/>
					<Route
						exact
						path='*'
						component={() => <Dashboard userdata={this.props.userdata} />}
					/>
				</Switch>
			</div>
		);
	}
}

export default MainSection;
