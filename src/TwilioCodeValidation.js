import * as React from 'react';

import './EmergencyMotivator.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { withRouter } from 'react-router-dom';
class TwilioCodeValidation extends React.Component {

    constructor(props) {
        super(props);
        this.addNewMotivator = this.addNewMotivator.bind(this);
    }


    addNewMotivator() {
        this.props.history.push('/emergency-motivator', { number: this.props.history.location.state?.number });
    }


    render() {
        return (
            <div className="CodeValidation">
                <h2 style={{ color: '#1976D2' }}>Twilio Code Validation</h2>
                <div>
                    <div className="add-contact">
                        <div className="text-basic">
                            <TextField
                                id="validationCode"
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
