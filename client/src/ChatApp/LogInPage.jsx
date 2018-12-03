import React from 'react';
import ReactDOM from 'react-dom';
import { Redirect } from 'react-router-dom';

const axios = require('axios');

class LogInPage extends React.Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      signUpNeeded: false,
      authenticated: false
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
    e.preventDefault();
    if (this.state.username && this.state.password) {
      axios.get('/authenticate', {
        params: {
          username: this.state.username,
          password: this.state.password
        }
      })
      .then((res) => {
        if (!res.data) {
          this.setState({ signUpNeeded: true });
        }
        else {
          this.setState({ authenticated: true });
        }
      })
      .catch((error) => {
        console.log(error);
      });
    } else {
      alert('fields cannot be empty');
    }
  }

  render() {
    if (this.state.signUpNeeded) {
      return <Redirect to='/signup' />
    } else if (this.state.authenticated) {
      return <Redirect to={{
                pathname: '/chat',
                state: { username: this.state.username }
              }} />
    }

    return (
       <div>
        <form onSubmit={this.handleFormSubmit}>
          Username:<br/>
        <input type="text" name="username" onChange={this.handleFormInputChange} /><br/>
          Password:<br/>
        <input type="password" name="password" onChange={this.handleFormInputChange} /><br/>
          <button>Login</button>
        </form>
        <button onClick={() => { this.setState({ signUpNeeded: true })}}>Sign Up</button>
       </div>
    )
  }
}

export default LogInPage
