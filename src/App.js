import logo from './logo.svg';
import './App.css';
import Start from './Start';
import ToDo from './ToDo';
import EmergencyMotivator from './EmergencyMotivator';
import Login from './Login/Login';
import SignUp from './Login/SignUp';
import Schedule from './Schedule';
import AddNewTodo from './AddNewTodo';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
  withRouter
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Switch>
          <Route exact path="/">
            <Start />
          </Route>
          <Route exact path="/todo">
            <ToDo />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/signup">
            <SignUp />
          </Route>
          <Route exact path="/emergency-motivator">
            <EmergencyMotivator />
          </Route>
          <Route exact path="/add-todo">
            <AddNewTodo />
          </Route>
          <Route exact path="/schedule">
            <Schedule />
          </Route>
          {/* <Route exact path="/home">
            <Home />
          </Route>
          <Route exact path="/profile">
            <Profile />
          </Route>
          <Route path="/peopleNearMe/:id">
            <PeopleNearMe />
          </Route> */}
      </Switch>
    </div>
  );
}

export default withRouter(App);
