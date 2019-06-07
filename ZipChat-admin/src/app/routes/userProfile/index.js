import React from 'react';
import axios from 'axios';

import ContainerHeader from 'components/ContainerHeader/index';
import { constant } from '../../../constant';

class UserProfile extends React.Component {

    state = {
        user: [],
        userData: [],
        openModal: false
    }

    componentDidMount() {
        console.log('params', this.props.match.params.id)
        this.loadData();
    }

    loadData = () => {
        axios.get(`${constant.API_ENDPOINT}/user/${this.props.match.params.id}`)
            .then(response => this.setState({user: response.data}))
            .catch(error => console.log(error));
    }

    showModal = () => {
        this.setState({openModal: !this.state.openModal})
    }

    render() {
        return(
            <div className="app-wrapper app-wrapper-module">
                <div className="dashboard animated slideInUpTiny animation-duration-3">
                    <ContainerHeader match={this.props.match} title="User Profile"/>

                    <div className="row mb-md-4">
                        <div className="col-12">
                            <div className="jr-card p-0">
                                <div className="jr-card-header mb-0 p-4 bg-primary">
                                    <h3 className="card-heading">User Profile</h3>
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-3">
                                            <div className="mt-4 mb-2">
                                                <div>First Name</div>
                                            </div>
                                            <div className="form-group">
                                                <input type="text" value={this.state.user.firstName} name="stripeKey"  placeholder="Stripe key" className="form-control form-control-lg" />
                                            </div>
                                        </div>
                                        <div className="col-3">
                                            <div className="mt-4 mb-2">
                                                <div>Last Name</div>
                                            </div>
                                            <div className="form-group">
                                                <input type="text" value={this.state.user.lastName} name="stripeKey" placeholder="Stripe key" className="form-control form-control-lg" />
                                            </div>
                                        </div>
                                        <div className="col-3">
                                            <div className="mt-4 mb-2">
                                                <div>Email</div>
                                            </div>
                                            <div className="form-group">
                                                <input type="text" value={this.state.user.email} name="stripeKey"  placeholder="Stripe key" className="form-control form-control-lg" />
                                            </div>
                                        </div>
                                        <div className="col-3">
                                            <div className="mt-4 mb-2">
                                                <div>Mobile Number</div>
                                            </div>
                                            <div className="form-group">
                                                <input type="text" value={this.state.user.mobile_number} name="stripeKey"  placeholder="Stripe key" className="form-control form-control-lg" />
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{fontSize: 20}}>Kyc uploads</div>
                                    <div className="row">
                                        <div className="col-3" style={{height: '100%'}}>
                                            <div className="mt-4 mb-2">
                                                <div>Address Proof</div>
                                            </div>
                                            <img src={this.state.user.proofs && this.state.user.proofs.addressProof} height='100%' width='100%'></img>
                                        </div>
                                        <div className="col-3" style={{height: '100%'}}>
                                            <div className="mt-4 mb-2">
                                                <div>ID Proof</div>
                                            </div>
                                            <img src={this.state.user.proofs && this.state.user.proofs.idProof} height='100%' width='100%'></img>
                                        </div>
                                        <div className="col-3" style={{height: '100%'}}>
                                            <div className="mt-4 mb-2">
                                                <div>Photo Proof</div>
                                            </div>
                                            <img src={this.state.user.proofs && this.state.user.proofs.photoProof} height='100%' width='100%'></img>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default UserProfile;