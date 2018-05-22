import React, { Component } from 'react';
import {connect} from 'react-redux'; 
import './risk.css';

class LevelButton extends Component {

    selectRiskLevel (value) {     
        this.props.dispatch({type: 'SELECT_RISK_LEVEL', selectedLevel: this.props.label})
    }

    render() {
        let classes = 'btn level-button';
        classes += this.props.selectedLevel.toString() === this.props.label ? ' active' : '';

        return (
            <div className={classes} onClick={ this.selectRiskLevel.bind(this, this.props.label) }>
                <span>{ this.props.label }</span>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        selectedLevel: state.selectedLevel
    }
};

export default connect(mapStateToProps)(LevelButton);