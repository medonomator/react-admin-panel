import React from 'react'
import App from '../containers/app'
import Login from '../containers/login'
import API from './axios'

import { getToken, setAuthorizationToken } from './'

export const Auth = () => {
  if (getToken()) {
    setAuthorizationToken(getToken())
    API.get('/user/auth')
      .then((res) => {
        return <App />
      })
      .catch((err) => {
        return <Login />
      })
  }

  return <Login />
}
