import React from 'react';
import axios from 'axios';
import moment from 'moment';

import ContainerHeader from 'components/ContainerHeader/index';
import DialogSlide from 'components/Dialog/index';
import { constant } from '../../../constant';

import SweetAlert from 'react-bootstrap-sweetalert';

class TermsAndConditions extends React.Component {

    state = {
        terms: '',
        success: false,
        admin: {}
    }

    componentDidMount() {

        axios.get(`${constant.API_ENDPOINT}/admin`)
            .then(response => {
                if(response.status === 200) this.setState({admin: response.data, terms: response.data.termsAndConditions})
            })
            .catch(error => console.log(error));

    }

    saveTerms = () => {
        axios.post(`${constant.API_ENDPOINT}/admin/${this.state.admin._id}`, {termsAndConditions: this.state.terms})
            .then(response => {
                if(response.status === 200) this.setState({success: true})
            })
            .catch(error => console.log(error));
    }

    handleInputChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;

        this.setState({
        [name]: value
        }, () => console.log(this.state));
    }

    onConfirm = () => {
        this.setState({success: false});
    }

    render() {
        return(
            <div className="app-wrapper app-wrapper-module">
            <div className="dashboard animated slideInUpTiny animation-duration-3">
                <ContainerHeader match={this.props.match} title="XLM Transaction History"/>

                <div className="row mb-md-4">
                    <div className="col-12">
                        <div className="jr-card">
                            <div className="row">
                                <div className="col-12">
                                    <div className="jr-card p-0">
                                        <div className="jr-card-header mb-0 p-4 bg-primary">
                                            <h3 className="card-heading">Terms and Conditions</h3>
                                        </div>
                                        <div className="card-body">
                                            <div className="form-group">
                                                <label>Enter the terms and conditions</label>
                                                <textarea onChange={this.handleInputChange} value={this.state.terms} name="terms" className="form-control form-control-lg" rows="10" />
                                            </div>
                                            <div role="presentation" onClick={this.saveTerms} className="btn jr-btn-rounded btn-primary btn-rounded">Save</div>
                                        </div>
                                        <SweetAlert show={this.state.success} success title="Success!" onConfirm={this.onConfirm}>
                                            App Terms and conditions is set!!
                                        </SweetAlert>
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

export default TermsAndConditions;