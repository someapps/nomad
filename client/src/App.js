import React, { Component } from "react";
import { Provider } from 'react-redux';
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Material UI
// import Drawer from 'material-ui/Drawer';
// import MenuItem from 'material-ui/MenuItem';
import TopPanel from './components/top-panel/TopPanel';
import SidePanel from './components/SidePanel';

// Pages
// import SampleApp from './components/SampleApp';
import DashboardPage  from './components/DashboardPage';
import Progress   from './components/Progress' ;
import Profile    from './components/Profile'  ;
import Settings   from './components/Settings' ; 
import SignInPage from './components/auth/SignInPage';

class App extends Component {
  render() {
    return (
      <Provider store={this.props.store} >
        <Router>
          <Switch>
            <Route path="/signin" component={SignInPage} />
            <Route path="/" component={MainApp} />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

class MainApp extends Component {
  render() {
    return (
      <div id="app">
        <SidePanel />
        <TopPanel />
        <main className="main">
          <Switch>
            <Route path='/dashboard' component={DashboardPage} />
            <Route path='/progress' component={Progress} />
            <Route path='/profile' component={Profile} />
            <Route path='/settings' component={Settings} />
          </Switch>
        </main>
      </div>
    );
  }
}

export default App;
