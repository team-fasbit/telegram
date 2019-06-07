import React from 'react';
import Stepper, {Step, StepContent, StepLabel} from 'material-ui/Stepper';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';


function getSteps() {
    return ['Manage your commissions from the dashboard', 'Manage your Stellar transactions from your Stellar Wallet', 'Manage your USD transactions from your Fiat Wallet', 'Manage your app users from here'];
}

function getStepContent(step) {
    switch (step) {
        case 0:
            return `Set transaction fee and commissions`;
        case 1:
            return `Current XLM balance. XLM transaction management`;
        case 2:
            return `Current USD balance. USD transaction management`;
        case 3:
            return `User management`;
        default:
            return 'Unknown step';
    }
}

class VerticalLinearStepper extends React.Component {
    state = {
        activeStep: 0,
    };

    handleNext = () => {
        this.setState({
            activeStep: this.state.activeStep + 1,
        });
    };

    handleBack = () => {
        this.setState({
            activeStep: this.state.activeStep - 1,
        });
    };

    handleReset = () => {
        this.setState({
            activeStep: 0,
        });
    };

    render() {
        const steps = getSteps();
        const {activeStep} = this.state;

        return (
            <div className="w-100">
                <Stepper activeStep={activeStep} orientation="vertical">
                    {steps.map((label, index) => {
                        return (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                                <StepContent className="pb-3">
                                    <Typography>{getStepContent(index)}</Typography>
                                    <div className="mt-2">
                                        <div>
                                            <Button
                                                disabled={activeStep === 0}
                                                onClick={this.handleBack}
                                                className="jr-btn"
                                            >
                                                Back
                                            </Button>
                                            <Button
                                                raised
                                                color="primary"
                                                onClick={this.handleNext}
                                                className="jr-btn"
                                            >
                                                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                            </Button>
                                        </div>
                                    </div>
                                </StepContent>
                            </Step>
                        );
                    })}
                </Stepper>
            </div>
        );
    }
}

export default VerticalLinearStepper;