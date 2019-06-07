import React from 'react';
import moment from 'moment';
import axios from 'axios';

import ContainerHeader from 'components/ContainerHeader/index';
import BasicTabs from 'components/basic/BasicTabs';
import ReportBox from 'components/ReportBox/index';
import { constant } from '../../../constant';

const tableTitle = [
    'SNo', 'User', 'Amount', 'WalletAddress', 'Date', 'Time', 'Status'
];

class StellarWallet extends React.Component {
    state = {
        sent: [],
        received: [],
        sentData: [],
        receivedData: [],
        stellarBalance: 0
    }

    componentDidMount() {
        this.loadData()
        setInterval(() => this.loadData(), 60000);
    }

    loadData = () => {
        axios.get(`${constant.API_ENDPOINT}/admin/sent`)
            .then(response => this.setDetails('sent', 'sentData', response.data))
            .catch(error => console.log(error));

        axios.get(`${constant.API_ENDPOINT}/admin/received`)
            .then(response => this.setDetails('received', 'receivedData', response.data))
            .catch(error => console.log(error));

        axios.get(`${constant.API_ENDPOINT}/admin/stellar`)
            .then(response => this.setState({stellarBalance: response.data[0].balance}))
            .catch(error => console.log(error));
            
        axios.get('https://min-api.cryptocompare.com/data/price?fsym=XLM&tsyms=USD')
            .then((response) => this.setState({currentRate: response.data.USD}))
            .catch(error => console.log(error));
    }

    setDetails = (key, final, response) => {
        this.setState({[key]: response}, () => this.splitFields(key === 'sent' ? this.state.sent : this.state.received, final))
    }

    splitFields = async (data, final) => {
        let details = {}
        let finalData = []
        await data.map((item, index) => {
            details.SNo = index + 1;
            details.User = item._id;
            details.Amount = item.amount;
            details.WalletAddress = final === 'sentData' ? item.receiver && item.receiver.stellarAddress : item.sender && item.sender.stellarAddress;
            details.Date = moment(item.createdTs).format('MM/DD/YYYY');
            details.Time = moment(item.createdTs).format('HH:mm');
            details.Status = 'Success';
            finalData.push(Object.assign({}, details));
        });
        this.setState({[final]: finalData})
    }

    render() {
        return(
            <div className="app-wrapper app-wrapper-module">
            <div className="dashboard animated slideInUpTiny animation-duration-3">
                <ContainerHeader match={this.props.match} title="Stellar Wallet"/>

                <div className="row" style={{display: 'flex', justifyContent: 'center', height: '100%'}}>
                    <div className="col-lg-4 col-sm-6 col-12 col-lg-offset-3">
                        <ReportBox
                            styleName="bg-teal accent-4 text-white"
                            title="Stellar"
                            detail="Balance"
                            subHeadingColor="text-white"
                        >
                            <h1 style={{display: 'flex', alignItems: 'center', height: '100%'}}>{this.state.stellarBalance} XLM</h1>
                        </ReportBox>
                    </div>

                    <div className="col-lg-3 col-sm-6 col-12">
                        <ReportBox
                            styleName="bg-red text-white"
                            title="XLM"
                            detail="Market Rate"
                            subHeadingColor="text-white"
                        >
                            <h1 style={{display: 'flex', alignItems: 'center', height: '100%'}}>1 XLM = {this.state.currentRate} USD</h1>
                        </ReportBox>
                    </div>
                </div>

                <div className="row mb-md-4">
                    <div className="col-12">
                        <div className="jr-card">
                            <div className="jr-card-header d-flex align-items-center">
                                <h3 className="mb-0">Transaction History</h3>
                            </div>
                            {this.state.sentData.length > 0 && <BasicTabs tableTitle={tableTitle} tab1={this.state.sentData} tab2={this.state.receivedData}  key1="Send" key2="Receive"/>}
                        </div>
                    </div>
                </div>
            </div>
            </div>
        )
    }
}

export default StellarWallet;