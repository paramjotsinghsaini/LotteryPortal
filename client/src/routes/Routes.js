import React from "react";
import { Redirect, Route, Switch } from "react-router"
import Register from "../pages/auth/Register"
import Home from "../pages/Home"
import Login from "../pages/auth/Login"
import Dashboard from "../pages/postLogin/Dashboard";
import Draw from "../pages/postLogin/Draw";
import { getUser } from "../functions/authUser";



const authCheck = (Component) => () => {
  const user = getUser();
  if(user)
  {
    return <Component />
    
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
    </Switch>
  )
}
   
  export default Routes