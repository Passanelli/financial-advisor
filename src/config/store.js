
import { createStore } from 'redux';
import data from '../data.json';
import {SELECT_RISK_LEVEL} from './actions';

const initialState = {
    data: data,
    selectedLevel: 1
  }
  
  function reducer(state = initialState, action) {
    switch (action.type) {
      case SELECT_RISK_LEVEL:
        return { ...state, selectedLevel: action.selectedLevel } 
      default:
        return state
    }
  }
  
  export const store = createStore(reducer);