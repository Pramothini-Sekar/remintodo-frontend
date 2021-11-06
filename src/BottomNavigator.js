import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Paper from '@mui/material/Paper';
import EventNoteIcon from '@mui/icons-material/EventNote';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import HomeIcon from '@mui/icons-material/Home';

class BottomNavigator extends React.Component {

    constructor(props) {
        super(props);
        this.navigateToSchedule = this.navigateToSchedule.bind(this);
        this.navigateToHome = this.navigateToHome.bind(this);
        this.navigateToMotivator = this.navigateToMotivator.bind(this);
    }

    navigateToSchedule() {
        this.props.history.push('/schedule', { number: this.props.number });
    }

    navigateToHome() {
        this.props.history.push('/todo', { number: this.props.number });
    }

    navigateToMotivator() {
        this.props.history.push('/emergency-motivator', { number: this.props.number });
    }

    render() {
        return (
            <div className="bottom-navigation">
                <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
                    <BottomNavigation showLabels>
                        <BottomNavigationAction label="Schedule" onClick={this.navigateToSchedule} icon={<EventNoteIcon />} />
                        <BottomNavigationAction label="Home" onClick={this.navigateToHome} icon={<HomeIcon />} />
                        <BottomNavigationAction label="Motivator" onClick={this.navigateToMotivator} icon={<ContactPhoneIcon />} />
                    </BottomNavigation>
                </Paper>
            </div>
        );
    }
}

export default BottomNavigator;