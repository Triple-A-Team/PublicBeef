import React from 'react'
import { logout } from '../../api/users'
import { Redirect } from 'react-router-dom'

const Logout = () => {
  logout()
  return <Redirect to='/' />
}

export default Logout