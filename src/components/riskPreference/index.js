import React, { Component } from 'react';
import {connect} from 'react-redux'; 
import './risk.css';
import { PieChart } from 'react-easy-chart';
import RiskLevel from './riskLevel';

class RiskPreference extends Component {

    render() {
        let { data, selectedLevel } = this.props;
        let chartData = [];
        data[selectedLevel].map((value) => {
            if (value.value > 0) {
                chartData.push(value);
            }
        });

        return (
            <div className='flex column risk-preference-container'>
                <h3>Please select your risk preference</h3>
                <RiskLevel />
                <div className='flex column pie-chart'>
                    <span className='pie-legend'>INVESTMENT PORTFOLIO</span>
                    <PieChart
                    labels
                    size={500}
                    padding={10}
                    innerHoleSize={250}
                    data={chartData} />
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        data: state.data,
        selectedLevel: state.selectedLevel
    }
};

export default connect(mapStateToProps)(RiskPreference);