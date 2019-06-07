import React from 'react';
import axios from 'axios';

import { constant } from '../../../constant';
import SignIn from 'components/signUp/Login1'

class Login extends React.Component {

    state = {
        mobile: '1234567890',
        password: '00000'
    }

    login = () => {
        axios.post(`${constant.API_ENDPOINT}/admin/login`, {mobile_number: this.state.mobile, password: this.state.password})
            .then(response => this.props.history.push('/app/dashboard'))
            .catch(error => console.log(error));
    }

    handleInputChange = (event) => {
        console.log(event.target, event.target.value, event.target.name);
        const value = event.target.value;
        const name = event.target.name;

        this.setState({
        [name]: value
        }, () => console.log(this.state));
     }

    render() {
        return (
            <div style={{width: '100%', height: '100%'}}>
                <SignIn login={this.login} mobile={this.state.mobile} password={this.state.password} handleInputChange={this.handleInputChange} />
            </div>
        )
    }
}

export default Login;
