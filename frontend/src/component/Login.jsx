import React, { Component } from "react";
import "./Login.css";
import Logo from "../img/logo.png";
import { css } from "@emotion/core";
// First way to import
import { ScaleLoader } from "react-spinners";
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

class Login extends Component {
  render() {
    // let value=(this.props.pass) ? undefined : "";
    return (
      <div>
        <div className="container">
          <div id="main-outer-div">
            <div id="logo-div">
               
              <img id="logo-img" src={Logo} alt="" />
            </div>
            <div id="title-div">
              <h4 className="title">Welcome to Denji EMS</h4>
              <p style={{color:'#94a3b8',marginTop:6,marginBottom:0,fontSize:13}}>Use your email and password to continue</p>
            </div>

            <div id="outer-login-form-div">
              <form onSubmit={this.props.onSubmit}>
                  <input 
                    className="login-form-input"
                    type="email"
                    placeholder="Email"
                    required
                    name="Email"
                    autoComplete="username"
                    autoFocus
                  />
                  <input 
                    className="login-form-input"
                    type="password"
                    placeholder="Password"
                    required
                    name="Password"
                    autoComplete="current-password"
                  />
                  <input 
                    className="login-form-input"
                    type="submit"
                    // className="btn btn-primary btn-block btn-lg btn-mystyle"
                    value="Sign in"
                    id="submitBtn"
                  />
                {/* </div> */}
                {!this.props.pass ? (
                  <p className="alert">Invalid UserName or Password</p>
                ) : (
                  ""
                )}
              </form>
            </div>

            <div className="loading">
              <ScaleLoader
                css={override}
                sizeUnit={"px"}
                size={150}
                color={"#123abc"}
                loading={this.props.loading}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
