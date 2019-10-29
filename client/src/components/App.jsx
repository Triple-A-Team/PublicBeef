import React from 'react'
import { withRouter } from 'react-router'
import { Route, Switch } from 'react-router-dom'
import './App.css';
import Home from './containers/Home'

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route path="/" exact component={Home} />
          <Route render={() => <h2>404</h2>} />
        </Switch>
      </div>
    )
  }
}
export default withRouter(App)
