import React, {Component} from 'react';
import OrderTableCell from './OrderTableCell';


let counter = 0;


class OrderTable extends Component {
    state = {
        data: [],
    };

    componentDidMount() {
        const info = [];
        if (this.props.key1 === 'Deposit' || this.props.key1 === 'Withdraw') {
            this.props.tableData.map((item) => {
                info.push(this.createData(item.SNo, item.User, item.Amount, item.CardNo, item.Date, item.Time, item.Status))
            })
        } else {
            this.props.tableData.map((item) => {
                info.push(this.createData(item.SNo, item.User, item.Amount, item.WalletAddress, item.Date, item.Time, item.Status))
            })
        }
        this.setState({data: info});
    }

    createData(SNo, User, Amount, CardNo, Date, Time, Status) {
        if (this.props.key1 === 'Deposit' || this.props.key1 === 'Withdraw') {
            return {SNo, User, Amount, CardNo, Date, Time, Status};
        } else {
            return {SNo, User, Amount, CardNo, Date, Time, Status};
        }
    }

    render() {
        const {data} = this.state;
        
        return (
            <div className="table-responsive-material">
                <table className="default-table table-unbordered table table-sm table-hover">
                    <thead className="th-border-b">
                    <tr>
                        {this.props.tableTitle.map((item) => <th>{item}</th>)}
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.data.map(data => {
                        return (
                            <OrderTableCell data={data} key1={this.props.key1}/>
                        );
                    })}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default OrderTable;