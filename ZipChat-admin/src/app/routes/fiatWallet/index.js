import React from 'react';
import axios from 'axios';
import moment from 'moment';

import ContainerHeader from 'components/ContainerHeader/index';
import BasicTabs from 'components/basic/BasicTabs';
import ReportBox from 'components/ReportBox/index';
import { constant } from '../../../constant';

const tableTitle = [
    'SNo', 'User', 'Amount', 'CardNo', 'Date', 'Time', 'Status'
];

class FiatWallet extends React.Component {
    state = {
        deposit: [],
        withdraw: [],
        depositData: [],
        withdrawData: [],
        fiatBalance: 0
    }

    componentDidMount() {
        this.loadData();
        setInterval(() => this.loadData(), 60000);
    }

    loadData = () => {
        axios.get(`${constant.API_ENDPOINT}/admin/deposit`)
            .then(response => this.setDetails('deposit', 'depositData', response.data))
            .catch(error => console.log(error));

        axios.get(`${constant.API_ENDPOINT}/admin/withdraw`)
            .then(response => this.setDetails('withdraw', 'withdrawData', response.data))
            .catch(error => console.log(error));

        axios.get(`${constant.API_ENDPOINT}/admin/fiat`)
            .then(response => this.setState({fiatBalance: response.data.available[0].amount}))
            .catch(error => console.log(error));
            
        axios.get('https://min-api.cryptocompare.com/data/price?fsym=USD&tsyms=XLM')
            .then((response) => this.setState({currentRate: response.data.XLM}))
            .catch(error => console.log(error));
    }

    setDetails = (key, final, response) => {
        this.setState({[key]: response}, () => this.splitFields(key === 'deposit' ? this.state.deposit : this.state.withdraw, final))
    }

    splitFields = async (data, final) => {
        let details = {}
        let finalData = []
        await data.map((item, index) => {
            details.SNo = index + 1;
            details.User = item._id;
            details.Amount = item.amount;
            details.CardNo = item.cardNumber
            details.Date = moment(item.createdTs).format('MM/DD/YYYY');
            details.Time = moment(item.createdTs).format('HH:mm');
            details.Status = final === 'depositData' ? 'Success' : 'Pending';
            finalData.push(Object.assign({}, details));
        });
        this.setState({[final]: finalData})
    }

    render() {
        return(
            <div className="app-wrapper app-wrapper-module">
            <div className="dashboard animated slideInUpTiny animation-duration-3">
                <ContainerHeader match={this.props.match} title="Fiat Wallet"/>

                <div className="row" style={{display: 'flex', justifyContent: 'center', height: '100%'}}>
                    <div className="col-lg-4 col-sm-6 col-12 col-lg-offset-3">
                        <ReportBox
                            styleName="bg-teal accent-4 text-white"
                            title="Fiat"
                            detail="Balance"
                            subHeadingColor="text-white"
                        >
                            <h1 style={{display: 'flex', alignItems: 'center', height: '100%'}}>{this.state.fiatBalance} USD</h1>
                        </ReportBox>
                    </div>

                    <div className="col-lg-4 col-sm-6 col-12">
                        <ReportBox
                            styleName="bg-red text-white"
                            title="USD"
                            detail="Market Rate"
                            subHeadingColor="text-white"
                        >
                            <h1 style={{display: 'flex', alignItems: 'center', height: '100%'}}>1 USD = {this.state.currentRate} XLM</h1>
                        </ReportBox>
                    </div>
                </div>

                <div className="row mb-md-4">
                    <div className="col-12">
                        <div className="jr-card">
                            <div className="jr-card-header d-flex align-items-center">
                                <h3 className="mb-0">Transaction History</h3>
                            </div>
                            {this.state.depositData.length > 0 && this.state.withdrawData.length > 0 && <BasicTabs tableTitle={tableTitle} tab1={this.state.depositData} tab2={this.state.withdrawData} key1="Deposit" key2="Withdraw"/>}
                        </div>
                    </div>
                </div>
            </div>
            </div>
        )
    }
}

export default FiatWallet;