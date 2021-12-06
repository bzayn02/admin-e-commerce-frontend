import Register from './pages/register/Register.js';
import './App.css';
import Login from './pages/login/Login';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Category from './pages/category/Category';
import EmailVerification from './pages/email-verification/EmailVerification';
import { PageNotFound } from './components/page-not-found/404PageNotFound';
import Product from './pages/product/Product';
import Customer from './pages/customer/Customer';
import Payment from './pages/payment/Payment';
import Order from './pages/order/Order';
import Dashboard from './pages/dashboard/Dashboard';
import { PrivateRoute } from './components/private-route/PrivateRoute';

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <PrivateRoute path="/dashboard">
            <Dashboard />
          </PrivateRoute>
          <PrivateRoute path="/categories">
            <Category />
          </PrivateRoute>
          <PrivateRoute path="/products">
            <Product />
          </PrivateRoute>
          <PrivateRoute path="/orders">
            <Order />
          </PrivateRoute>
          <PrivateRoute path="/customers">
            <Customer />
          </PrivateRoute>
          <PrivateRoute path="/payments">
            <Payment />
          </PrivateRoute>

          <Route path="/email-verification" children={<EmailVerification />} />
          <Route path="/registration" children={<Register />} />

          <Route path="/" children={<Login />} />
          <Route path="*" children={<PageNotFound />} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
