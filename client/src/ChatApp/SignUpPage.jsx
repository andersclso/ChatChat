import React from 'react';
import { Redirect } from 'react-router-dom';

const axios = require('axios');

class SignUpPage extends React.Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      repassword: '',
      accountCreated: false
    }

    this.handleFormInputChange = this.handleFormInputChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleFormSubmit(e) {
    let password = this.state.password;
    let username = this.state.username;

    e.preventDefault();
    if (username && password && this.state.repassword) {
      if (password.length < 8) {
        alert('password must be atleast 8 characters long');
      }
      else if (password !== this.state.repassword) {
        alert('passwords do not match');
      } else {
        console.log('creating account');
        axios.post('/createuser', { username, password })
          .then((response) => {
            if (response.data) {
              this.setState({ accountCreated: true });
            }
          })
          .catch((error) => console.error(error));
      }
    } else {
      alert('fields cannot be empty');
    }
  }

  render() {
    if (this.state.accountCreated) {
      return <Redirect to={{
                pathname: '/chat',
                state: { username: this.state.username }
              }}  />;
    }

    return (
      <div>
        <form onSubmit={this.handleFormSubmit}>
          Username:<br/>
          <input type="text" name="username" onChange={this.handleFormInputChange} /><br/>
          Password:<br/>
          <input type="password" name="password" onChange={this.handleFormInputChange} /><br/>
          Re-type Password:
          <input type="password" name="repassword" onChange={this.handleFormInputChange} /><br/>
          <button>Create Account</button>
        </form>
      </div>
    )
  }
}

export default SignUpPage
