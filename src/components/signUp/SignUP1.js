import React from 'react';
import Button from 'material-ui/Button';

export const Rate = (props) => {
    return (
        <div
            className="login-container d-flex justify-content-center align-items-center animated slideInUpTiny animation-duration-3">
            <div className="login-content text-center">
                <div className="mb-4">
                    <h2>Set up your profit</h2>
                </div>
   
                <div className="login-form">
                    <form onSubmit={props.rate}  >
                        <div className="form-group" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                            <span>Sell Rate (%)</span>
                            <span>
                                <input type="text" placeholder="Sell Rate in %" className="form-control form-control-lg" name="sellRate" value={props.sellRate} onChange={props.handleInputChange} />
                            </span>
                        </div>
                        <div className="mt-4 mb-2">
                              <div role="presentation" onClick={props.saveRate} className="btn jr-btn-rounded btn-primary btn-rounded">Save</div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export const TransactionRate = (props) => {
    return (
        <div
            className="login-container d-flex justify-content-center align-items-center animated slideInUpTiny animation-duration-3">
            <div className="login-content text-center">
                <div className="mb-4">
                    <h2>Set up transaction fee</h2>
                </div>

                <div className="login-form">
                    <form method="post" action="#/">
                        <div className="form-group" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                            <span>Send Transaction (%)</span>
                            <span><input type="text" placeholder="Send Transaction fee in %" className="form-control form-control-lg" name="sendTransactionFee" value={props.sendTransactionFee} onChange={props.handleInputChange}/></span>
                        </div>
                        <div className="form-group" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                            <span>Sell Transaction (%)</span>
                            <span><input type="text" placeholder="Sell Transaction fee in %" className="form-control form-control-lg" name="sellTransactionFee" value={props.sellTransactionFee} onChange={props.handleInputChange}/></span>
                        </div>
                        <div className="mt-4 mb-2">
                            <div role="presentation" onClick={props.saveTransactionFee} className="btn jr-btn-rounded btn-primary btn-rounded">Save</div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
