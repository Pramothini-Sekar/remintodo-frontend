import * as React from 'react';
import { withRouter } from 'react-router-dom';
import BottomNavigator from './BottomNavigator';

import './Schedule.css';

class Schedule extends React.Component {
    render() {
        return (
            <div className="Schedule">
                <h2>Schedule</h2>
                <BottomNavigator history={this.props.history} />
            </div>
        );
    }
}

export default withRouter(Schedule);