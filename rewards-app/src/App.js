import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom'

import HeaderSearch from './components/Header/HeaderSearch';
import TableReviewers from './components/Table/TableReviewers';
import LoginForm from './components/LoginForm/LoginForm';

function App() {

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <HeaderSearch></HeaderSearch>
          <TableReviewers />
        </Route>
        <Route exact path="/join">
          <LoginForm></LoginForm>
        </Route>
        <Route exact path="/terms-and-conditions">
        </Route>
        <Route exact path="/profile">
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
