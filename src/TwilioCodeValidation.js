import * as React from 'react';

import './EmergencyMotivator.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { withRouter } from 'react-router-dom';
import { Steps } from 'intro.js-react';
import "intro.js/introjs.css";

class TwilioCodeValidation extends React.Component {

    constructor(props) {
        super(props);
        this.addNewMotivator = this.addNewMotivator.bind(this);
        this.onExit = this.onExit.bind(this);
        this.state = {
            stepsEnabled: true,
            initialStep: 0,
            steps: [
                {
                    element: '.validated',
                    intro: 'You must input this 6-digit code in the Twilio verification call you will receive now',
                }
            ]
        }
    }


    addNewMotivator() {
        this.props.history.push('/emergency-motivator', { number: this.props.history.location.state?.number });
    }

    onExit() {
        this.setState({ stepsEnabled: false });
    }

    render() {
        const {
            stepsEnabled,
            steps,
            initialStep
        } = this.state;
        return (
            <div className="CodeValidation">
                <h2 style={{ color: '#1976D2' }}>Twilio Code Validation</h2>
                <Steps
                    enabled={stepsEnabled}
                    steps={steps}
                    initialStep={initialStep}
                    onExit={this.onExit}
                />
                <div>
                    <div className="add-contact">
                        <div className="text-basic">
                            <TextField
                                id="validationCode"
                                className="validated"
                                label="Validation Code"
                                variant="outlined"
                                value={this.props.history.location.state?.validationCode}
                            />
                        </div>
                    </div>
                    <div className="emergency-button">
                        <Button sx={{ m: 1, minWidth: 200 }} onClick={this.addNewMotivator} variant="outlined">Validated by Twilio Call</Button>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(TwilioCodeValidation);
