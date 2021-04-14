import {React, Router, Switch, Route, Link, Signin, Register, About, Contact, Home} from "./Import"

function Header()
{
    return (
    <Router>
      <div className="container-fluid">
        <nav className="navbar navbar-expand-lg navbar-light fixed-top py-3" data-navbar-on-scroll="data-navbar-on-scroll">
        <div className="container-fluid"><Link className= "nav-link fw-medium" to="/">Lottery Portal</Link>
          <button className="navbar-toggler collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto ms-lg-4 ms-xl-7 border-bottom border-lg-bottom-0 pt-2 pt-lg-0">
              <li className="nav-item"><Link className= "nav-link fw-medium" to="/">Home</Link></li>
              <li className="nav-item"><Link className= "nav-link fw-medium" to="/about">About</Link></li>
              <li className="nav-item"><Link className= "nav-link fw-medium" to="/contact-us">Contact Us</Link></li>
              <li className="nav-item"><Link className= "nav-link fw-medium" to="/login">Login</Link></li>
              <li className="nav-item"><Link className= "nav-link fw-medium" to="/register">Get Started</Link></li>
            </ul>
          </div>
        </div>
      </nav>
        <Switch>
          <Route path="/login">
            <Signin />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/contact-us">
            <Contact />
          </Route>
          <Route path="/">
            <Home /> 
          </Route>
        </Switch>
      </div>
    </Router>
    );
}
export default Header;