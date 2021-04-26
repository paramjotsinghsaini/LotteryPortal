import React from "react";
import { Redirect, Route, Switch } from "react-router"
import Register from "../pages/auth/Register"
import Home from "../pages/Home"
import Login from "../pages/auth/Login"
import Dashboard from "../pages/postLogin/Dashboard"
import { default as AdminDashboard } from "../pages/admin/Dashboard"
import User from "../pages/admin/User"
import UserForm from "../pages/admin/UserForm"
import LotteryForm from "../pages/admin/LotteryForm"
import Draw from "../pages/postLogin/Draw"
import { getUser } from "../functions/authUser";
import Lottery from "../pages/admin/Lottery";
import UserCredits from "../pages/admin/UserCredits";


const authCheck = (Component) => () => {
  const user = getUser();
  if(user)
  {
    return user.isAdmin !== 1 ? (
      <Component />
    ) : (
      <Redirect to="/admin/dashboard" />
    );
  }else{
    <Redirect to="/login" />
  }
};
const adminCheck = (Component) => () => {
  const user = getUser();
  if(user)
  {
    return user.isAdmin === 1 ? (
      <Component />
    ) : (
      <Redirect to="/dashboard" />
    );
  }else{
    <Redirect to="/login" />
  }
};

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} /> 
      <Route exact path="/register" component={Register} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/dashboard" render={authCheck(Dashboard)}/>
      <Route exact path="/lottery/:eventId" render={authCheck(Draw)}/>
      <Route exact path="/admin/dashboard" render={adminCheck(AdminDashboard)}/>
      <Route exact path="/admin/users" render={adminCheck(User)}/>
      <Route exact path="/admin/lottery" render={adminCheck(Lottery)}/>
      <Route exact path="/admin/user/add" render={adminCheck(UserForm)}/>
      <Route exact path="/admin/user/:userId" render={adminCheck(UserForm)}/>
      <Route exact path="/admin/lottery/add" render={adminCheck(LotteryForm)}/>
      <Route exact path="/admin/lottery/:eventId" render={adminCheck(LotteryForm)}/>
      <Route exact path="/admin/credit" render={adminCheck(UserCredits)}/>
    </Switch>
  )
}
   
  export default Routes