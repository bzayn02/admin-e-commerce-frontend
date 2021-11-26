import Register from './pages/register/Register.js';
import './App.css';
import Login from './pages/login/login';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Dashboard } from './pages/dashboard/Dashboard.js';
import { EmailVerification } from './pages/email-verification/EmailVerification.js';
import { PageNotFound } from './components/page-not-found/404PageNotFound.js';

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/registration" children={<Register />} />
          <Route path="/dashboard" children={<Dashboard />} />
          <Route path="/email-verification" children={<EmailVerification />} />
          <Route path="/" children={<Login />} />
          <Route path="*" children={<PageNotFound />} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
