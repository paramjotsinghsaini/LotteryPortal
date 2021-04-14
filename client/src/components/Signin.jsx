import { useEffect } from "react";
import {React, Link, Axios, useState} from "./Import";
function Signin()
{
    const [email, emailReq] = useState("");
    const [password, passwordReq] = useState("");
    Axios.defaults.headers.post['Content-Type'] ='application/x-www-form-urlencoded';
    Axios.defaults.withCredentials = true;
    

    const login = function(){
        var serverUrl = "http://127.0.0.1:5000/login";
        var data = {
            email: email, 
            password: password
        };
        Axios.post(serverUrl, data).then(function(response){
            console.log(response);
        });
    };

    useEffect(function(){
        Axios.get('http://localhost:5000/login').then(function(response){
            console.log(response);
        });
    }, []);
    return (
    <section className="d-flex align-items-center pt-8">
        <div className="container">
            <div className="row justify-content-center form-bg-image">
            <div className="col-12 d-flex align-items-center justify-content-center">
                <div
                className="signin-inner my-3 my-lg-0 bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                <div className="text-center text-md-center mb-4 mt-md-0">
                    <h1 className="mb-0 h3">Sign in to our platform</h1>
                </div>
                <form action="#" className="mt-4">
                    <div className="form-group mb-4">
                    <label>Your Email</label>
                    <div className="input-group">
                        <span className="input-group-text" id="basic-addon1"><span className="fas fa-envelope"></span></span>
                        <input type="email" className="form-control" placeholder="example@company.com" id="email" autoFocus required onChange={function(e){
                                emailReq(e.target.value);;
                            }}/>
                    </div>
                    </div>
                    <div className="form-group">
                    <div className="form-group mb-4">
                        <label>Your Password</label>
                        <div className="input-group">
                        <span className="input-group-text" id="basic-addon2"><span className="fas fa-unlock-alt"></span></span>
                        <input type="password" placeholder="Password" className="form-control" id="password" required onChange={function(e){
                                passwordReq(e.target.value);;
                            }}/>
                        </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="defaultCheck5"/>
                        <label className="form-check-label">
                            Remember me
                        </label>
                        </div>
                        {/* <div><a href="# " className="small text-right">Lost password?</a></div> */}
                    </div>
                    </div>
                    <button type="submit" className="btn btn-block btn-primary" onClick={login}>Sign in</button>
                </form>
                <div className="d-flex justify-content-center align-items-center mt-4">
                    <span className="font-weight-normal">
                    Not registered?
                    {/* <a href="./sign-up.html" className="font-weight-bold">Create account</a> */}
                    <Link to="/register" className="font-weight-bold"> Create account</Link>
                    </span>
                </div>
                </div>
            </div>
            </div>
        </div>
    </section>

    );
}

export default Signin;