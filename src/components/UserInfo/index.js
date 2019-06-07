import React from 'react';
import Avatar from 'material-ui/Avatar'


class UserInfo extends React.Component {
    render() {
        return (
            <div className="user-profile d-flex flex-row align-items-center">
                <Avatar
                    alt='...'
                    src='http://via.placeholder.com/256x256'
                    className="user-avatar "
                />
                <div className="user-detail">
                    <h4 className="user-name"> Admin <i
                        className="zmdi zmdi-caret-down zmdi-hc-fw align-middle"/>
                    </h4>
                </div>
            </div>
        );
    }
}

export default UserInfo;

