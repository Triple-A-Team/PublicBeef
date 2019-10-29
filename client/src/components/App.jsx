import React from 'react'
import { withRouter } from 'react-router'
import { Route, Switch } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import Home from './containers/Home'
import Head from './presentational/Head'
import MainNavbar from './presentational/Navbar'
import NewPost from './forms/NewPost'
import Signup from './forms/Signup'
import Login from './forms/Login'
import Logout from './forms/Logout'

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Head title="PublicBeef" />
        <MainNavbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" exact component={Login} />
          <Route path="/signup" exact component={Signup} />
          <Route path="/post" exact component={NewPost} />
          <Route path="/logout" exact component={Logout} />
        </Switch>
      </div>
    )
  }
}
export default withRouter(App)
