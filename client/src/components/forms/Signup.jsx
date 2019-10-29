import React from 'react'

class Signup extends React.Component {
  render() {
    return (
      <div className="signup">
        <form action="/api/signup" method="POST" enctype="multipart/form-data">
          <p>Name:</p>
          <input type="text" name="username" placeholder="Your Name" required />
          <p>nickname:</p>
          <input type="text" name="nickname" placeholder="Your nickname" required />
          <p>Password:</p>
          <input type="password" name="password" placeholder="Your password" required />
          <p>Email: (optional)</p>
          <input type="email" name="email" placeholder="email@gmail.com" />
          <p> Profile Picture:</p>
          <input type="file" name="profilePicture" />
          <button className="btn btn-danger">Create Account</button>
          <p>Bio:</p>
          <input type="text" name="bio" placeholder="Your Bio" required />
          <p>City:</p>
          <input type="text" name="city" placeholder="Your City" required />
        </form>
      </div>
    )
  }
}

export default Signup