import React from 'react';
import { defaultProps } from 'recompose';

const SignIn = (props) => {
    return (
        <div
            className="login-container d-flex justify-content-center align-items-center animated slideInUpTiny animation-duration-3">
            <div className="login-content">
                <div className="login-header">
                    <a className="app-logo" href="#/" title="ZipChat">
                        <img src="https://res.cloudinary.com/draalvptx/image/upload/v1548841191/zipchat.png" alt="ZipChat" title="ZipChat"/>
                    </a>
                </div>

                <div className="login-form">
                    <form>
                        <fieldset>
                            <div className="form-group">
                                <input name="mobile" id="mobile_number" className="form-control form-control-lg"
                                       placeholder="Mobile Number" type="text" value={props.mobile} onChange={props.handleInputChange}/>
                            </div>
                            <div className="form-group">
                                <input name="password" id="password" className="form-control form-control-lg"
                                       placeholder="Password" type="password" value={props.password} onChange={props.handleInputChange}/>
                            </div>
                            <div role="presentation" onClick={props.login} className="btn jr-btn-rounded btn-primary btn-rounded">Sign In</div>
                        </fieldset>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
