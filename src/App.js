import React, { Component } from 'react';
import './App.css';
import {
  BrowserRouter as Router, 
  Route
} from 'react-router-dom';
import Header from './components/header/header';
import RiskPreference from './components/riskPreference/index';
import RecommendedPortfolio from './components/recommendedPortfolio/index';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import data from './data.json';

const initialState = {
  data: data,
  selectedLevel: 1
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'SELECT_RISK_LEVEL':
      return Object.assign({}, state, action)
    default:
      return state
  }
}

const store = createStore(reducer);

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
