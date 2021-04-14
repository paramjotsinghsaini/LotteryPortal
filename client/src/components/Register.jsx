import {React, Link, Axios, useState} from "./Import";
function Register()
{
    const [name, nameReq] = useState("");
    const [email, emailReq] = useState("");
    const [password, passwordReq] = useState("");
    Axios.defaults.headers.post['Content-Type'] ='application/x-www-form-urlencoded';

    const register = function(){
        var serverUrl = "http://127.0.0.1:5000/register";
        var data = {
            name: name, 
            email: email, 
            password: password
        };
        Axios.post(serverUrl, data).then(function(response){
            console.log(response);
        });
    };
    return (
        <section className="d-flex align-items-center pt-8">
        <div className="container">
            <div className="row justify-content-center form-bg-image">
            <div className="col-12 d-flex align-items-center justify-content-center">
                <div
                className="signin-inner my-3 my-lg-0 bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                <div className="text-center text-md-center mb-4 mt-md-0">
                    <h1 className="mb-0 h3">Register</h1>
                </div>
                <form action="#" className="mt-4">
                    <div className="form-group mb-4">
                        <label>Enter Name</label>
                        <div className="input-group">
                            <span className="input-group-text" id="basic-addon1"><span className="fas fa-envelope"></span></span>
                            <input type="text" className="form-control" placeholder="Name" name="name" autoFocus required onChange={function(e){
                                nameReq(e.target.value);;
                            }}/>
                        </div>
                    </div>
                    <div className="form-group mb-4">
                        <label>Enter Email</label>
                        <div className="input-group">
                            <span className="input-group-text" id="basic-addon1"><span className="fas fa-envelope"></span></span>
                            <input type="email" className="form-control" placeholder="name@name.com" name="email" required onChange={function(e){
                                emailReq(e.target.value);;
                            }}/>
                        </div>
                    </div>
                    <div className="form-group mb-4">
                        <label>Enter Password</label>
                        <div className="input-group">
                        <span className="input-group-text" id="basic-addon2"><span className="fas fa-unlock-alt"></span></span>
                        <input type="password" placeholder="Password" className="form-control" name="password" required onChange={function(e){
                            passwordReq(e.target.value);
                        }}/>
                        </div>
                    </div>
                    <button type="button" className="btn btn-block btn-primary" onClick={register}>Register</button>
                </form>
                <div className="d-flex justify-content-center align-items-center mt-4">
                    <span className="font-weight-normal">
                    Already registered?
                    <Link to="/login"> Login</Link>
                    </span>
                </div>
                </div>
            </div>
            </div>
        </div>
        </section>
    );
}

export default Register;