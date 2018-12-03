import React from 'react';
import ReactDOM from 'react-dom';
import { render } from 'react-dom';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LogInPage from './ChatApp/LogInPage.jsx';
import SignUpPage from './ChatApp/SignUpPage.jsx';
import ChatApp from './ChatApp';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <div>
            <Switch>
              <Route exact path='/' component={LogInPage} />
              <Route path='/signup' component={SignUpPage} />
              <Route path='/chat' component={ChatApp} />
            </Switch>
          </div>
        </Switch>
      </BrowserRouter>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
