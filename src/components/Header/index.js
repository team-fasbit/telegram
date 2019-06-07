import React from 'react';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';

import {COLLAPSED_DRAWER, FIXED_DRAWER} from 'constants/ActionTypes';

class Header extends React.Component {

    constructor() {
        super();
        this.state = {
            searchBox: false,
            searchText: '',
            mailNotification: false,
            appNotification: false,
        }
    }

    render() {
        const {onToggleCollapsedNav, drawerType} = this.props;
        const drawerStyle = drawerType.includes(FIXED_DRAWER) ? "d-block d-xl-none" : drawerType.includes(COLLAPSED_DRAWER) ? "d-block" : "d-none";

        return (
            <AppBar className="app-main-header">
                <Toolbar className="app-toolbar" disableGutters={false}>
                    <IconButton className={`jr-menu-icon ${drawerStyle}`} aria-label="Menu"
                                onClick={onToggleCollapsedNav}>
                        <span className="menu-icon"/>
                    </IconButton>

                    <a className="app-logo" href="#/app/dashboard">
                        <img src="https://res.cloudinary.com/draalvptx/image/upload/v1548841191/zipchat.png" alt="ZipChat" title="ZipChat"/>
                    </a>

                    <a href="#/app/dashboard" style={{color: 'white', cursor: 'pointer', textDecoration: 'none'}}>
                        <h1 style={{display: 'flex', justifyContent: 'center', marginBottom: '0' , marginLeft: '0.5em'}}>ZipChat</h1>
                    </a>
                    <ul className="header-notifications list-inline ml-auto">
                        <li className="list-inline-item">
                            <a href="#/login" style={{display: 'flex', justifyContent: 'center', marginBottom: '0', color: 'white', cursor: 'pointer', textDecoration: 'none'}}>Logout</a>
                        </li>
                    </ul>
                </Toolbar>
            </AppBar>
        );
    }

}


export default Header;
