import React, { Component } from 'react';
import {connect} from 'react-redux';

class CurrentPortfolio extends Component {

    constructor(props) {
        super(props);
        this.state = {
            bonds: '',
            largeCap: '',
            midCap: '',
            foreign: '',
            smallCap: '',
            bondsNew: 0,
            largeCapNew: 0,
            midCapNew: 0,
            foreignNew: 0,
            smallCapNew: 0,
            calculated: false,
            transfers: []
        }
        this.diffs = []
    }

    _buttonDisabled = () => {
        return (this.state.bonds === '' || this.state.largeCap === '' || this.state.midCap === '' || this.state.foreign === '' || this.state.smallCap === '');
    }

    calculateDiffs = () => {
        let { data, selectedLevel } = this.props;
        let total = parseFloat(this.state.bonds) + parseFloat(this.state.largeCap) + parseFloat(this.state.midCap) + parseFloat(this.state.foreign) + parseFloat(this.state.smallCap);
        this.setState({
            bondsNew: (total * (data[selectedLevel][0]['value'] / 100)).toFixed(2),
            largeCapNew: (total * (data[selectedLevel][1]['value'] / 100)).toFixed(2),
            midCapNew: (total * (data[selectedLevel][2]['value'] / 100)).toFixed(2),
            foreignNew: (total * (data[selectedLevel][3]['value'] / 100)).toFixed(2),
            smallCapNew: (total * (data[selectedLevel][4]['value'] / 100)).toFixed(2),
            calculated: true
        }, this.buildDifferencesObject)
    }

    buildDifferencesObject = () => {
        this.diffs.push(
            {id: 'bonds', key: 'Bonds', difference: this.state.bondsNew - this.state.bonds},
            {id: 'largeCap', key: 'Large Cap', difference: this.state.largeCapNew - this.state.largeCap},
            {id: 'midCap', key: 'Mid Cap', difference: this.state.midCapNew - this.state.midCap},
            {id: 'foreign', key: 'Foreign', difference: this.state.foreignNew - this.state.foreign},
            {id: 'smallCap', key: 'Small Cap', difference: this.state.smallCapNew - this.state.smallCap}
        )
        this.diffs.sort((a, b) => {
            if (a.difference < b.difference) {
                return -1;
            }
            if (a.difference > b.difference) {
                return 1;
            }
            return 0;
        })
        this.calculateMovements()
    }

    calculateMovements = () => {
        let history = [];
        for (let i = 0; i < this.diffs.length; i++) {
            while(this.diffs[i].difference !== 0) {
                for (let j = this.diffs.length - 1; j > -1; j--) {
                    if (this.diffs[i].id !== this.diffs[j].id) {
                        if ((this.diffs[i].difference + this.diffs[j].difference).toFixed(2) >= 0) {
                            if ((this.diffs[i].difference * -1).toFixed(2) > 0) {
                                history.push(`Transfer $ ${(this.diffs[i].difference * -1).toFixed(2)} from ${this.diffs[i].key} to ${this.diffs[j].key}`)
                            }
                            this.diffs[j].difference += this.diffs[i].difference;
                            this.diffs[i].difference = 0;
                            j = -1;
                        } else if ((this.diffs[i].difference + this.diffs[j].difference).toFixed(2) < 0) {
                            if ((this.diffs[j].difference).toFixed(2) > 0) {
                                history.push(`Transfer $ ${(this.diffs[j].difference).toFixed(2)} from ${this.diffs[i].key} to ${this.diffs[j].key}`)
                            }
                            this.diffs[i].difference += this.diffs[j].difference;
                            this.diffs[j].difference = 0;
                        }
                    }
                }
            }
        }
        this.setState({
            transfers: history
        })
    }

    handleChange = (e) => {
        let change = {};
        change[e.target.name] = e.target.value;
        this.setState({
            [e.target.name]: e.target.value,
            calculated: false
        })
    }

    render() {
        let { data, selectedLevel } = this.props;

        let rows = data[selectedLevel].map((value, i) => {
            let diff = this.state.calculated ? (this.state[value.id + 'New'] - this.state[value.id]).toFixed(2) : '';
            let result = this.state.calculated ? this.state[value.id + 'New'] : '';
            return <tr key={i}>
                <td>{value.key + ' $'}</td>
                <td><input onChange={this.handleChange} type='number' name={value.id}/></td>
                <td><input className={diff > 0 ? 'positive-value' : 'negative-value'} type='text' value={diff} disabled/></td>
                <td><input className='amount-result' value={result} type='text' disabled/></td>
            </tr>
        })
        
        let movements = this.state.transfers.map((val, i) => {
            return <li key={i}>{val}</li>
        })

        return (
            <div>
                <div className='flex rebalance-container'>
                    <span>Please entre your current portfolio</span>
                    <button className='btn primary' onClick={this.calculateDiffs} disabled={this._buttonDisabled()}>Rebalance</button>
                </div>
                <table className='portfolio-values'>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Current Amount</th>
                            <th>Difference</th>
                            <th>New Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        { rows }
                    </tbody>
                </table>
                {movements.length > 0 && <div>
                    <span>Recommended Transfers: </span>
                    <ul className='recommended-transfers'>
                        { movements }
                    </ul>
                </div>}
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

export default connect(mapStateToProps)(CurrentPortfolio);