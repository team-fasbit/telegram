import React from 'react';

class OrderTableCell extends React.Component {

    onOptionMenuSelect = event => {
        this.setState({menuState: true, anchorEl: event.currentTarget});
    };
    handleRequestClose = () => {
        this.setState({menuState: false});
    };

    constructor() {
        super();
        this.state = {
            anchorEl: undefined,
            menuState: false,
        }
    }

    render() {
        const {anchorEl, menuState} = this.state;
        const {SNo, User, Amount, CardNo, Date, Time, Status} = this.props.data;
        // const statusStyle = status.includes("Completed") ? "text-white bg-success" : status.includes("On Hold") ? "bg-amber" : status.includes("Delayed") ? "text-white bg-danger" : "text-white bg-grey";
        return (
            <tr
                tabIndex={-1}
                key={SNo}
            >
                <td>{SNo}</td>
                <td>{User}</td>
                <td>{Amount}</td>
                <td>{CardNo}</td>
                <td>{Date}</td>
                <td>{Time}</td>
                <td>{Status}</td>
            </tr>

        );
    }
}

export default OrderTableCell;
