import React from 'react'

class Login extends React.Component {
  render() {
    return (
      <div className="login">
        <form action="/api/login" method="POST">
          <p>Name:</p>
          <input type="text" name="username" placeholder="Your name" />
          <p>Password:</p>
          <input type="password" name="password" placeholder="Your password" />
          <button className="btn btn-danger"> Login </button>
        </form>
      </div>
    )
  }
}

export default Login