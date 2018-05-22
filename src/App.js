import React, { Component } from 'react';
import './App.css';
import {
  BrowserRouter as Router, 
  Route
} from 'react-router-dom';
import Header from './components/header/header';
import RiskPreference from './components/riskPreference/index';
import RecommendedPortfolio from './components/recommendedPortfolio/index';
import { Provider } from 'react-redux';
import {store} from './config/store'

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Header />
            <Route exact path='/' pageTitle='Risk Preference' component={RiskPreference} />
            <Route exact path='/recommended' pageTitle='Some page title' component={RecommendedPortfolio} />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
