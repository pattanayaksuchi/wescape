import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../actions/authActions";
import classnames from "classnames";
import createPaymentObject from "../Payment/CreatePaymentObject";
import createUUID from "../Payment/createUUID";
import sendData from "../APICalls/sendData";
const OrgID = "45ssiuz3";

class LoginPage extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {},
      service: "dmevent",
      fingerprintSessionId: createUUID(),
      message: "",
      saving: "false",
      resp: "",
      servError: "",
      servData: "",
    };
  }

  componentDidMount() {
    const tmxHeadScript = document.createElement("script");
    tmxHeadScript.type = "text/javascript";
    tmxHeadScript.src = `https://h.online-metrix.net/fp/tags.js?org_id=${OrgID}&session_id=wescaper${this.state.fingerprintSessionId}`;
    document.head.appendChild(tmxHeadScript);
  }

  componentDidUpdate() {
    if (
      this.props.auth.isAuthenticated &&
      this.state.resp.status === "ACCEPTED"
    ) {
      console.log("Opening Dashboard");
      this.props.history.push("/dashboard");
    } else if (
      this.props.auth.isAuthenticated &&
      this.state.resp.status === "REJECTED"
    ) {
      alert("You have been blocked");
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    let obj = createPaymentObject(this.state);
    if (obj.route) {
      sendData(obj.route, obj.paymentObject).then((data) => {
        console.log("Data sent to server.");

        this.setState({
          message: data.message,
          saving: false,
          resp: JSON.parse(data.response),
          servError: JSON.parse(data.error),
          servData: JSON.parse(data.data),
        });
      });
      console.log("State after DM transaction is ", this.state);
    }
    const userData = {
      email: this.state.email,
      password: this.state.password,
    };
    console.log(userData);
    this.props.loginUser(userData, this.state.resp.status);
  };
  render() {
    const { errors } = this.state;
    return (
      <div className="container">
        <div style={{ marginTop: "4rem" }} className="row">
          <div className="col s8 offset-s2">
            <Link to="/" className="btn-flat waves-effect">
              <i className="material-icons left">keyboard_backspace</i> Back to
              home
            </Link>
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <h4>
                <b>Login</b> below
              </h4>
              <p className="grey-text text-darken-1">
                Don't have an account? <Link to="/register">Register</Link>
              </p>
            </div>
            <form noValidate onSubmit={this.onSubmit}>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.email}
                  error={errors.email}
                  id="email"
                  type="email"
                  className={classnames("", {
                    invalid: errors.email || errors.emailnotfound,
                  })}
                />
                <label htmlFor="email">Email</label>
                <span className="red-text">
                  {errors.email}
                  {errors.emailnotfound}
                </span>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.password}
                  error={errors.password}
                  id="password"
                  type="password"
                  className={classnames("", {
                    invalid: errors.password || errors.passwordincorrect,
                  })}
                />
                <label htmlFor="password">Password</label>
                <span className="red-text">
                  {errors.password}
                  {errors.passwordincorrect}
                </span>
              </div>
              <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                <button
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem",
                  }}
                  type="submit"
                  className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
LoginPage.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});
export default connect(mapStateToProps, { loginUser })(LoginPage);
