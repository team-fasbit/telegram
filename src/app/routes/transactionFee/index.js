import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';

import SendFee from './routes/sendFee'
import DepositFee from './routes/depositFee'
import WithdrawFee from './routes/withdrawFee'

const TransactionFee = ({match}) => (
    <div className="app-wrapper">
        <Switch>
            <Route path={`${match.url}/sendFee`} component={SendFee}/>
            <Route path={`${match.url}/depositFee`} component={DepositFee}/>
            <Route path={`${match.url}/withdrawFee`} component={WithdrawFee}/>
        </Switch>
    </div>
);

export default TransactionFee;