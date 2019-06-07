import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import Button from 'material-ui/Button';
import 'jquery-slimscroll/jquery.slimscroll.min';


class SideNavContent extends Component {
    componentDidMount() {
        const {history} = this.props;
        const $nav = $(this.nav);
        const slideDuration = 250;

        $nav.slimscroll({
            height: '100%'
        });

        const pathname = `#${history.location.pathname}`;// get current path

        $('ul.nav-menu > li.menu').click(function () {
            const menuLi = this;
            $('ul.nav-menu > li.menu').not(menuLi).removeClass('open');
            $('ul.nav-menu > li.menu ul').not($('ul', menuLi)).slideUp(slideDuration);
            $('> ul', menuLi).slideToggle(slideDuration);
            $(menuLi).toggleClass('open');
        });

        $('ul.sub-menu li').click(function (e) {
            let superSubMenu = $(this).parent();
            if (superSubMenu.parent().hasClass('active')) {
                $('li', superSubMenu).not($(this)).removeClass('active');
            }
            else {
                $('ul.sub-menu li').not($(this)).removeClass('active');
            }

            $(this).toggleClass('active');
            e.stopPropagation();
        });

        const activeLi = $('a[to="' + pathname + '"]');// select current a element
        const activeNav = activeLi.closest('ul'); // select closest ul
        if (activeNav.hasClass('sub-menu')) {
            activeNav.slideDown(slideDuration);
            activeNav.parent().addClass('open');
            activeLi.parent().addClass('active');
        } else {
            activeLi.parent().addClass('open');
        }
    }


    render() {
        return (
            <ul className="nav-menu" ref={(c) => {
                this.nav = c;
            }}>

                <li className="menu no-arrow">
                    <Link to="/app/dashboard">
                        <i className="zmdi zmdi-view-dashboard zmdi-hc-fw"/>
                        <span className="nav-text">Dashboard</span>
                    </Link>
                </li>
                <li className="menu no-arrow">
                    <Link to="/app/fiatWallet">
                        <i className="zmdi zmdi-view-dashboard zmdi-hc-fw"/>
                        <span className="nav-text">Fiat Wallet</span>
                    </Link>
                </li>
                <li className="menu no-arrow">
                    <Link to="/app/stellarWallet">
                        <i className="zmdi zmdi-view-dashboard zmdi-hc-fw"/>
                        <span className="nav-text">Stellar Wallet</span>
                    </Link>
                </li>
                <li className="menu no-arrow">
                    <Link to="/app/userManagement">
                        <i className="zmdi zmdi-view-dashboard zmdi-hc-fw"/>
                        <span className="nav-text">User Management</span>
                    </Link>
                </li>
                <li className="menu no-arrow">
                    <Link to="/app/xlmTransaction">
                        <i className="zmdi zmdi-view-dashboard zmdi-hc-fw"/>
                        <span className="nav-text">XLM Transaction History</span>
                    </Link>
                </li>
                <li className="menu">
                    <Button href="javascript:void(0)">
                        <i className="zmdi zmdi-view-web zmdi-hc-fw"/>
                        <span className="nav-text">Transaction Fee</span>
                    </Button>

                    <ul className="sub-menu">
                        <li>
                            <Link className="prepend-icon" to="/app/transactionFee/sendFee">
                                <span className="nav-text">Send Fee</span>
                            </Link>
                        </li>
                        <li>
                            <Link className="prepend-icon" to="/app/transactionFee/withdrawFee">
                                <span className="nav-text">Withdraw Fee</span>
                            </Link>
                        </li>
                    </ul>
                </li>
                {/* <li className="menu no-arrow">
                    <Link to="/app/terms">
                        <i className="zmdi zmdi-view-dashboard zmdi-hc-fw"/>
                        <span className="nav-text">Terms and Conditions</span>
                    </Link>
                </li> */}

            </ul>
        );
    }
}

export default withRouter(SideNavContent);
