import React from 'react';
import axios from 'axios';
import {Link, withRouter} from 'react-router-dom';

import ContainerHeader from 'components/ContainerHeader/index';
import { constant } from '../../../constant';

const userColumn = ['SNo', 'Id', 'Name', 'Mobile', 'Device', 'Address']
class UserManagement extends React.Component {

    state = {
        user: [],
        userData: [],
        openModal: false
    }

    componentDidMount() {
        this.loadData();
        setInterval(() => this.loadData(), 60000);
    }

    loadData = () => {
        axios.get(`${constant.API_ENDPOINT}/admin/user`)
            .then(response => this.setUserDetails(response.data))
            .catch(error => console.log(error));
    }

    setUserDetails = (response) => {
        this.setState({user: response}, () => this.splitFields())
    }

    splitFields = () => {
        let details = {}
        let userData = []
        this.state.user.map((item, index) => {
            details.SNo = index + 1;
            details.Id = item._id;
            details.Name = item.full_name;
            details.Mobile = item.mobile_number;
            details.Device = item.device_type;
            details.Address = item.stellarAddress;
            userData.push(Object.assign({}, details));
        });
        this.setState({userData})
    }

    showModal = () => {
        
    }

    render() {
        return(
            <div className="app-wrapper app-wrapper-module">
            <div className="dashboard animated slideInUpTiny animation-duration-3">
                <ContainerHeader match={this.props.match} title="User Management"/>

                <div className="row mb-md-4">
                    <div className="col-12">
                        <div className="jr-card">
                            <div className="jr-card-header d-flex align-items-center">
                                <h3 className="mb-0">User List</h3>
                            </div>
                            <div className="table-responsive-material">
                                <table className="default-table table-unbordered table table-sm table-hover">
                                    <thead className="th-border-b">
                                    <tr>
                                        {userColumn.map((item) => <th>{item}</th>)}
                                    </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.userData.length > 0 ? this.state.userData.map(data => {
                                            return <tr>
                                                <td>{data.SNo}</td>
                                                <td>{data.Id}</td>
                                                <td>{data.Name}</td>
                                                <td>{data.Mobile}</td>
                                                <td>{data.Device}</td>
                                                <td>{data.Address}</td>
                                                {/* <td><Link to={`/app/user/${data.Id}`} params={{ id: data.Id }}>View Profile</Link></td> */}
                                            </tr>
                                        }) : <td>No data</td>}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        )
    }
}

export default UserManagement;