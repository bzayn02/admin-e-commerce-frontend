import Register from './pages/register/Register.js';
import Product from './pages/product/Product';
import Customer from './pages/customer/Customer';
import Payment from './pages/payment/Payment';
import Order from './pages/order/Order';
import Dashboard from './pages/dashboard/Dashboard';
import AdminProfile from './pages/admin-profile/AdminProfile.js';
import Login from './pages/login/Login';
import Category from './pages/category/Category';
import { PageNotFound } from './components/page-not-found/404PageNotFound';

import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import EmailVerification from './pages/email-verification/EmailVerification';
import { PrivateRoute } from './components/private-route/PrivateRoute';
import ResetPassword from './pages/password-reset/ResetPassword.js';

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
          <PrivateRoute path="/admin-profile">
            <AdminProfile />
          </PrivateRoute>
          <PrivateRoute path="/payments">
            <Payment />
          </PrivateRoute>
          <PrivateRoute path="/registration">
            <Register />
          </PrivateRoute>

          <Route path="/email-verification" children={<EmailVerification />} />
          <Route path="/reset-password" children={<ResetPassword />} />

          <Route path="/" children={<Login />} />
          <Route path="*" children={<PageNotFound />} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
