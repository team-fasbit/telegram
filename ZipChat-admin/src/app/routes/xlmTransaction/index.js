import React from 'react';
import axios from 'axios';
import moment from 'moment';

import ContainerHeader from 'components/ContainerHeader/index';
import DialogSlide from 'components/Dialog/index';
import { constant } from '../../../constant';

const historyColumn = ['SNo', 'Sender', 'Receiver', 'Amount', 'Date', 'Time']
class XLMTransactionHistory extends React.Component {

    state = {
        xlmHistory: [],
        history: [],
        openModal: false
    }

    componentDidMount() {
        this.loadData();
        setInterval(() => this.loadData(), 60000);
    }

    loadData = () => {
        axios.get(`${constant.API_ENDPOINT}/admin/userTransaction`)
            .then(response => this.setDetails(response.data))
            .catch(error => console.log(error));
    }

    setDetails = (response) => {
        this.setState({history: response}, () => this.splitFields())
    }

    splitFields = () => {
        let details = {}
        let xlmHistory = []
        this.state.history.map((item, index) => {
            details.SNo = index + 1;
            details.Sender = item.sender;
            details.Receiver = item.receiver && item.receiver._id;
            details.Amount = item.amount;
            details.Date = moment(item.createdTs).format('MM/DD/YYYY');
            details.Time = moment(item.createdTs).format('HH:mm');
            xlmHistory.push(Object.assign({}, details));
        });
        this.setState({xlmHistory})
    }

    showModal = () => {
        this.setState({openModal: !this.state.openModal})
    }

    render() {
        return(
            <div className="app-wrapper app-wrapper-module">
            <div className="dashboard animated slideInUpTiny animation-duration-3">
                <ContainerHeader match={this.props.match} title="XLM Transaction History"/>

                <div className="row mb-md-4">
                    <div className="col-12">
                        <div className="jr-card">
                            <div className="jr-card-header d-flex align-items-center">
                                <h3 className="mb-0">XLM Transaction History</h3>
                            </div>
                            <div className="table-responsive-material">
                                <table className="default-table table-unbordered table table-sm table-hover">
                                    <thead className="th-border-b">
                                    <tr>
                                        {historyColumn.map((item) => <th>{item}</th>)}
                                    </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.xlmHistory.length > 0 ? this.state.xlmHistory.map(data => {
                                            return <tr>
                                                <td>{data.SNo}</td>
                                                <td>{data.Sender}</td>
                                                <td>{data.Receiver}</td>
                                                <td>{data.Amount}</td>
                                                <td>{data.Date}</td>
                                                <td>{data.Time}</td>
                                            </tr>
                                        }) : <td>No data</td>}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                {this.state.openModal && <DialogSlide/>}
            </div>
            </div>
        )
    }
}

export default XLMTransactionHistory;