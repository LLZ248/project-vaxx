import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";

import AdminLayout from "layouts/Admin.js";
import AuthLayout from "layouts/Auth.js";
import PatientLayout from "layouts/Patient.js";


class AdminRoute extends Component{
  //Check if the user is logined admin
  render(){
    const fetch = require('sync-fetch')
    const metadata = fetch('/verify').json()
    const role = metadata.role;

    if(role !== "admin"){
      //Not login or is patient
      return <Redirect to="/auth/login"/>
    }else{
      return <AdminLayout {...this.props}/>
    }
  }
}

class AuthRoute extends Component{
  //Check if the user is logined admin
  render(){
    const fetch = require('sync-fetch')
    const metadata = fetch('/verify').json()
    const role = metadata.role;

    if(role === "admin"){
      return <Redirect to="/admin/dashboard"/>
    }else{
      return <AuthLayout {...this.props}/>
    }
  }
}

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/admin" component={AdminRoute} />
      <Route path="/auth" component={AuthRoute} />
      <Route path="/patient" render={(props) => <PatientLayout {...props} />} />
      <Redirect from="/" to="/patient/dashboard" />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
