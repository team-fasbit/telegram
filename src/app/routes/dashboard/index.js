import React from 'react';
import {
    Area,
    AreaChart,
    Bar,
    BarChart,
    Cell,
    Line,
    LineChart,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
    CartesianGrid,
    Brush
} from 'recharts';
import {
    announcementsNotification,
    appNotification,
    article,
    authors,
    chartData,
    lineChartData,
    marketingData,
    pieChartData
} from './data';
import SweetAlert from 'react-bootstrap-sweetalert';
import axios from 'axios';
import {constant} from '../../../constant'

import ContainerHeader from 'components/ContainerHeader/index';
import VerticalLinearStepper from 'components/vertical/VerticalLinearStepper';
import { Rate, TransactionRate } from 'components/signUp/SignUP1.js';
import ReportBox from 'components/ReportBox/index';
import {CopyToClipboard} from 'react-copy-to-clipboard';


const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

class Default extends React.Component {

    state = {
        histohour: '',
        histoday: '',
        histominute: '',
        success: false,
        admin: {},
        anchorEl: undefined,
        menuState: false,
        buyRate: '',
        sellRate: '',
        buyTransactionFee: '',
        sellTransactionFee: '',
        sendTransactionFee: '',
        stellarAddress: '',
        stellarSeed: '',
        stellarBalance: 0,
        fiatBalance: 0,
        currentRate: 0,
        userCount: 0,
        stripeKey: '',
        copied: false,
        copiedStellarSeed: false
    }

    componentDidMount() {
        this.getGraph();
        this.cryptoCmp('histominute');
        this.cryptoCmp('histohour');
        this.cryptoCmp('histoday');
        this.loadData();

        axios.get(`${constant.API_ENDPOINT}/admin`)
            .then(response => {
                if(response.status === 200) this.setState({admin: response.data, buyRate: response.data.buyRate, sellRate: response.data.sellRate, buyTransactionFee: response.data.buyTransactionFee, sellTransactionFee: response.data.sellTransactionFee, sendTransactionFee: response.data.sendTransactionFee, stellarAddress: response.data.stellarAddress, stellarSeed: response.data.stellarSeed, stripeKey: response.data.stripeKey})
            })
            .catch(error => console.log(error));

    }

    loadData = () => {
        axios.get(`${constant.API_ENDPOINT}/admin/stellar`)
            .then(response => this.setState({stellarBalance: response.data[0].balance}))
            .catch(error => console.log(error));
            
        axios.get('https://min-api.cryptocompare.com/data/price?fsym=XLM&tsyms=USD')
            .then((response) => this.setState({currentRate: response.data.USD}))
            .catch(error => console.log(error));

        axios.get(`${constant.API_ENDPOINT}/admin/fiat`)
            .then(response => this.setState({fiatBalance: response.data.available[0].amount}))
            .catch(error => console.log(error));

        axios.get(`${constant.API_ENDPOINT}/admin/user`)
            .then(response => this.setState({userCount: response.data.length}))
            .catch(error => console.log(error));
    }

    cryptoCmp = (key) => {
        fetch(`https://min-api.cryptocompare.com/data/${key}?fsym=XLM&tsym=USD&limit=10`)
            .then(res => res.json())
            .then(data => {
                if (key === 'histominute') this.setState({histominute: data.Data});
                if (key === 'histohour') this.setState({histohour: data.Data});
                if (key === 'histoday') this.setState({histoday: data.Data});
            });
    }

    getGraph = () => {
        var baseUrl = "https://widgets.cryptocompare.com/";
        var scripts = document.getElementsByTagName("script");
        var embedder = scripts[ scripts.length - 1 ];  
        var appName = encodeURIComponent(window.location.hostname);
        if(appName==""){appName="local";}
        var s = document.createElement("script");
        s.type = "text/javascript";
        s.async = true;
        var theUrl = baseUrl+'serve/v1/coin/chart?fsym=XLM&tsym=USD';
        s.src = theUrl + ( theUrl.indexOf("?") >= 0 ? "&" : "?") + "app=" + appName;
        document.getElementById("graph").appendChild(s);
    }

    onOptionMenuSelect = event => {
        this.setState({menuState: true, anchorEl: event.currentTarget});
    };
    handleRequestClose = () => {
        this.setState({menuState: false});
    };
      
    saveTransactionFee = () => {
        const payload = Object.assign({}, {sellTransactionFee: this.state.sellTransactionFee, sendTransactionFee: this.state.sendTransactionFee, buyTransactionFee: this.state.buyTransactionFee})
        this.save(payload);
    }

    saveRate = () => {
        const payload = Object.assign({}, {sellRate: this.state.sellRate, buyRate: this.state.buyRate})
        this.save(payload);
    }

    saveStripeKey = () => {
        const payload = Object.assign({}, {stripeKey: this.state.stripeKey})
        this.save(payload);
    }

    save = (payload) => {
        axios.post(`${constant.API_ENDPOINT}/admin/${this.state.admin._id}`, payload)
            .then(response => {
                if(response.status === 200) this.setState({success: true})
            })
            .catch(error => console.log(error));
    }
    
    handleInputChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;

        this.setState({[name]: value});
    }

    onConfirm = () => {
        this.setState({success: false});
    }

    generateAddress = () => {
        axios.get(`${constant.API_ENDPOINT}/admin/address`)
            .then(response => {
                if(response.status === 200) this.setState({admin: response.data, stellarAddress: response.data.stellarAddress, stellarSeed: response.data.stellarSeed})
            })
            .catch(error => console.log(error));
    }   

    render() {
        const {anchorEl, menuState} = this.state;
        return (
            <div className="app-wrapper app-wrapper-module" >
            <div className="dashboard animated slideInUpTiny animation-duration-3">
                <ContainerHeader match={this.props.match} title="Dashboard"/>

                <div className="row">
                    <div className="col-xl-5 col-12">
                        <div className="jr-card p-0">
                            <div>
                                <div id="graph"></div>
                            </div>
                        </div>
                    </div>

                    <div className="col-xl-7 col-12">
                    <div className="row">
                        <div className="col-lg-6 col-sm-6 col-12">
                            <ReportBox
                                styleName="bg-teal accent-4 text-white"
                                title={Number(this.state.stellarBalance).toFixed(2)}
                                detail="Stellar Balance"
                                subHeadingColor="text-white"
                            >
                                <BarChart data={chartData} maxBarSize={7}
                                        margin={{left: 0, right: 10, top: 10, bottom: 10}}>
                                    <Bar dataKey='amt' fill='white'/>
                                </BarChart>
                            </ReportBox>
                        </div>

                        <div className="col-lg-6 col-sm-6 col-12">
                            <ReportBox
                                styleName="bg-red text-white"
                                title={this.state.fiatBalance}
                                detail="Fiat Balance"
                                subHeadingColor="text-white"
                            >
                                <PieChart>
                                    <Pie dataKey="amt" data={pieChartData} cx="50%" cy="50%" innerRadius={30}
                                        outerRadius={45}
                                        fill="#ffc658"/>
                                    <Tooltip/>
                                </PieChart>
                            </ReportBox>
                        </div>
                    </div>

                    <div className="row" style={{marginTop: 39}}>
                    <div className="col-lg-6 col-sm-6 col-12">
                        <ReportBox
                            styleName="bg-purple text-white"
                            title={this.state.userCount}
                            detail="Users count"
                            subHeadingColor="text-white"
                        >
                            <LineChart data={lineChartData} margin={{left: 5, right: 10, top: 0, bottom: 0}}>
                                <Line dataKey='amt' stroke='white'/>
                            </LineChart>
                        </ReportBox>
                    </div>

                    <div className="col-lg-6 col-sm-6 col-12">
                        <ReportBox
                            styleName="bg-red text-white"
                            title="1XLM"
                            detail={`${this.state.currentRate} USD`}
                            subHeadingColor="text-white"
                        >
                            <PieChart onMouseEnter={this.onPieEnter}>
                                <Pie dataKey="amt"
                                     data={pieChartData} cx="50%" cy="50%"
                                     innerRadius={30}
                                     outerRadius={45}
                                     fill="#3367d6"
                                     paddingAngle={5}
                                >
                                    {
                                        pieChartData.map((entry, index) => <Cell key={index}
                                                                                 fill={COLORS[index % COLORS.length]}/>)
                                    }
                                </Pie>
                            </PieChart>
                        </ReportBox>
                    </div>
                    </div>
                </div>

                </div>

                <div className="row">
                    <div className="col-lg-8 col-sm-6 col-12">
                        <div className="jr-card p-0">
                            <div className="jr-card-header mb-0 p-4 bg-primary">
                                <h3 className="card-heading">Instruction to get started</h3>
                                <p className="sub-heading text-white">
                                    Follow the steps to get started
                                </p>
                            </div>
                            <div className="card-body">
                                <VerticalLinearStepper/>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-sm-6 col-12">
                        <div className="jr-card p-0">
                            <div className="jr-card-header mb-0 p-4 bg-primary">
                                <h3 className="card-heading">Stellar Address</h3>
                                <p className="sub-heading text-white">
                                    Create stellar address and seed.
                                </p>
                            </div>
                            <div className="card-body">
                                <div className="mt-4 mb-2">
                                    <div role='presentation' disabled onClick={this.generateAddress} className="btn btn-primary jr-btn-rounded">Generate Address</div>
                                </div>
                                <div className="form-group">
                                    <CopyToClipboard text={this.state.stellarAddress}
                                        onCopy={() => this.setState({copied: true})}>
                                            <span><input type="text" value={this.state.stellarAddress} disabled placeholder="Stellar Address" className="form-control form-control-lg" /></span>
                                    </CopyToClipboard>
                                    {this.state.copied ? <p>Copied!</p> : null}
                                </div>
                                <div className="form-group">
                                    <CopyToClipboard text={this.state.stellarSeed}
                                        onCopy={() => this.setState({copiedStellarSeed: true})}>
                                            <span><input type="password" value={this.state.stellarSeed} disabled placeholder="Stellar Seed" className="form-control form-control-lg" /></span>
                                    </CopyToClipboard>
                                    {this.state.copiedStellarSeed ? <p>Copied!</p> : null}
                                    
                                </div>
                            </div>
                        </div>
                        <div className="jr-card p-0">
                            <div className="jr-card-header mb-0 p-4 bg-primary">
                                <h3 className="card-heading">Stripe setup</h3>
                            </div>
                            <div className="card-body">
                                <div className="mt-4 mb-2">
                                    <div>Enter Stripe Key</div>
                                </div>
                                <div className="form-group">
                                    <input type="text" value={this.state.stripeKey} name="stripeKey" onChange={this.handleInputChange}  placeholder="Stripe key" className="form-control form-control-lg" />
                                </div>
                                <div className="mt-4 mb-2">
                                    <div role="presentation" onClick={this.saveStripeKey} className="btn jr-btn-rounded btn-primary btn-rounded">Save</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-lg-6 col-sm-6 col-12">
                        <TransactionRate handleInputChange={this.handleInputChange} buyTransactionFee={this.state.buyTransactionFee} sellTransactionFee={this.state.sellTransactionFee} sendTransactionFee={this.state.sendTransactionFee} saveTransactionFee={this.saveTransactionFee} />
                    </div>
                    <div className="col-lg-6 col-sm-6 col-12">
                        <Rate handleInputChange={this.handleInputChange} buyRate={this.state.buyRate} sellRate={this.state.sellRate} saveRate={this.saveRate} />
                    </div>
                    <SweetAlert show={this.state.success} success title="Success!" onConfirm={this.onConfirm}>
                        App customization is set!!
                    </SweetAlert>
                </div>

            </div>
            </div>

        );
    }
}

export default Default;