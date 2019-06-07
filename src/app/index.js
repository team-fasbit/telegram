import React from 'react';
import {Route, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {toggleCollapsedNav} from 'actions/index';
import {COLLAPSED_DRAWER, FIXED_DRAWER} from 'constants/ActionTypes';
import ColorOption from 'containers/Customizer/ColorOption';
import {isIOS, isMobile} from 'react-device-detect';

import Header from 'components/Header/index';
import Sidebar from 'containers/SideNav/index';
import Footer from 'components/Footer';
import Dashboard from './routes/dashboard';
import FiatWallet from './routes/fiatWallet';
import StellarWallet from './routes/stellarWallet';
import UserManagement from './routes/userManagement';
import XLMTransactionHistory from './routes/xlmTransaction';
import TransactionFee from './routes/transactionFee';
import UserProfile from './routes/userProfile';
import TermsAndConditions from './routes/TermsAndConditions.js';

class App extends React.Component {
    onToggleCollapsedNav = (e) => {
        const val = !this.props.navCollapsed;
        this.props.toggleCollapsedNav(val);
    };

    render() {
        const {match, drawerType} = this.props;
        const drawerStyle = drawerType.includes(FIXED_DRAWER) ? "fixed-drawer" : drawerType.includes(COLLAPSED_DRAWER) ? "collapsible-drawer" : "mini-drawer";

        //set default height and overflow for iOS mobile Safari 10+ support.
        if (isIOS && isMobile) {
            $('#body').addClass('ios-mobile-view-height')
        }
        else if ($('#body').hasClass('ios-mobile-view-height')) {
            $('#body').removeClass('ios-mobile-view-height')
        }

        return (
            <div className={`app-container ${drawerStyle}`}>

                <Sidebar onToggleCollapsedNav={this.onToggleCollapsedNav.bind(this)}/>
                <div className="app-main-container">
                    <div className="app-header">
                        <Header drawerType={drawerType} onToggleCollapsedNav={this.onToggleCollapsedNav}/>
                    </div>

                    <main className="app-main-content-wrapper">
                        <div className="app-main-content">
                            <Route path={`${match.url}/dashboard`} component={Dashboard}/>
                            <Route path={`${match.url}/fiatWallet`} component={FiatWallet}/>
                            <Route path={`${match.url}/stellarWallet`} component={StellarWallet}/>
                            <Route path={`${match.url}/userManagement`} component={UserManagement}/>
                            <Route path={`${match.url}/xlmTransaction`} component={XLMTransactionHistory}/>
                            <Route path={`${match.url}/transactionFee`} component={TransactionFee}/>
                            <Route path={`${match.url}/user/:id`} component={UserProfile}/>
                            <Route path={`${match.url}/terms`} component={TermsAndConditions}/>
                        </div>
                        <Footer/>
                    </main>
                </div>
                <ColorOption/>
            </div>
        );
    }
}


const mapStateToProps = ({settings}) => {
    const {navCollapsed, drawerType} = settings;
    return {navCollapsed, drawerType}
};
export default withRouter(connect(mapStateToProps, {toggleCollapsedNav})(App));