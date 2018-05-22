import React, { Component } from 'react';
import {connect} from 'react-redux'; 
import { Link } from 'react-router-dom';
import './risk.css';
import LevelButton from './levelButton';

class RiskLevel extends Component {

    render() {
        return (
            <div className='flex column risk-level-container'>
                <div className='flex indicators-labels'>
                    <span>Low</span>
                    <span>High</span>
                </div>
                <div className='flex risk-options'>
                    <LevelButton label='1' />
                    <LevelButton label='2' />
                    <LevelButton label='3' />
                    <LevelButton label='4' />
                    <LevelButton label='5' />
                    <LevelButton label='6' />
                    <LevelButton label='7' />
                    <LevelButton label='8' />
                    <LevelButton label='9' />
                    <LevelButton label='10' />
                    <Link to='/recommended' className='btn primary'>Continue</Link>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        selectedData: state.selectedData
    }
};

export default connect(mapStateToProps)(RiskLevel);