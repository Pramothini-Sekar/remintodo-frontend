import Tick from './Tick.png';
import './Start.css';
import Button from '@mui/material/Button';
import { useHistory } from 'react-router-dom';
import { withRouter } from 'react-router-dom';


function Start() {

    const history = useHistory();
    function handleClick() {
        history.push("/emergency-motivator");
    }
    
    return (
        <div className="Start">
            <div className="start-logo">
                <img src={Tick} className="App-logo" alt="logo" />
            </div>
            <div className="get-started-button">
                <Button onClick={handleClick} variant="outlined">Get Started</Button>
            </div>
        </div>
    );
}

export default withRouter(Start);
