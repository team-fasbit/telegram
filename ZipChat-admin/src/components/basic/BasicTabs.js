import React, {Component} from 'react';
import PropTypes from 'prop-types';
import AppBar from 'material-ui/AppBar';
import Tabs, {Tab} from 'material-ui/Tabs';
import OrderTable from "components/Table/OrderTable";

function TabContainer(props) {
    return (
        <div style={{padding: 20}}>
            {props.children}
        </div>
    );
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
};

class BasicTabs extends Component {
    state = {
        value: 0,
        tableTitle: this.props.tableTitle,
        tab1: this.props.tab1,
        tab2: this.props.tab2

    };

    componentDidMount() {
        this.setState({value: 0});
        console.log('qqqq', this.props)
    }

    handleChange = (event, value) => {
        this.setState({value});
    };

    render() {
        const {value} = this.state;

        return (
            <div>
                <AppBar className="bg-primary" position="static">
                    <Tabs value={value} onChange={this.handleChange} scrollable scrollButtons="on">
                        <Tab className="tab" label={this.props.key1} />
                        <Tab className="tab" label={this.props.key2} />
                    </Tabs>
                </AppBar>
                {value === 0 &&
                <TabContainer>
                    <OrderTable tableTitle={this.props.tableTitle} tableData={this.state.tab1} key1={this.props.key1} /> 
                </TabContainer>}
                {value === 1 &&
                <TabContainer>
                    <OrderTable tableTitle={this.props.tableTitle} tableData={this.state.tab2} key1={this.props.key2}/>
                </TabContainer>}
            </div>
        );
    }
}

export default BasicTabs;