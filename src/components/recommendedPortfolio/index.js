import React, { Component } from 'react';
import {connect} from 'react-redux';
import './portfolio.css';
import CurrentPortfolio from './currentPortfolio';

class RecommendedPortfolio extends Component {

    _getPercentage(obj) {
        return obj['value'] + '%';
    }

    render() {
        let { data, selectedLevel } = this.props;
        
        let tableHeader = data[selectedLevel].map((value, i) => {
            return <th key={i}>{value.key}</th>
        })

        return (
            <div className='flex column risk-preference-container'>
                <h3>Recommended Portfolio</h3>
                
                <span>Risk level { selectedLevel }</span>
                <table>
                    <thead>
                        <tr>
                            {tableHeader}
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{this._getPercentage(data[selectedLevel][0])}</td>
                            <td>{this._getPercentage(data[selectedLevel][1])}</td>
                            <td>{this._getPercentage(data[selectedLevel][2])}</td>
                            <td>{this._getPercentage(data[selectedLevel][3])}</td>
                            <td>{this._getPercentage(data[selectedLevel][4])}</td>
                        </tr>
                    </tbody>
                </table>
                <CurrentPortfolio />
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

export default connect(mapStateToProps)(RecommendedPortfolio);