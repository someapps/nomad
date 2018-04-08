import React, { Component } from "react";
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';

export default class SignInPage extends Component {
  state = { signin: false }

  componentWillReceiveProps(nextProps) {
    this.checkURL(nextProps);
  }

  componentWillMount() {
    this.checkURL(this.props);
  }

  checkURL(props) {
    if (props.match.path.slice(1) === 'signin') {
      this.setState({ signin: true });
    } else {
      this.setState({ signin: false });
    }
  }

  render() {
    const { signin } = this.state;
    return (
      <div className="signin">
        <div className="signin__info">Hi</div>
        <div className="signin__form">
          <div className="signin__form-box">
            <h1 className="heading-primary">
              { signin ? "Sign in" : "Create an account" }
            </h1>
            { signin ? <SignInForm /> : <SignUpForm /> }
          </div>
        </div>
      </div>
    );
  }
}