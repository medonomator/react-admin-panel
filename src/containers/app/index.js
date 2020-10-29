import React, { useEffect, useState } from 'react'
import { Route, Link } from 'react-router-dom'
import Home from '../home'
import About from '../about'
import { getToken, setAuthorizationToken } from '../../helpers'
import { Dimmer, Loader } from 'semantic-ui-react'
import { API } from '../../helpers/axios'

const App = (props) => {
  const [isAuth, setAuth] = useState(false)

  useEffect(() => {
    if (getToken()) {
      setAuthorizationToken(getToken())
      API('GET', 'user/auth')
        .then((res) => {
          setAuth(true)
        })
        .catch((err) => {
          props.history.push('/admin/login')
        })
    } else {
      props.history.push('/admin/login')
    }
  }, [])

  if (!isAuth)
    return (
      <Dimmer active inverted>
        <Loader />
      </Dimmer>
    )

  return (
    <div>
      <header>
        <Link to="/admin">Home</Link>
        <Link to="/admin/about">About</Link>
      </header>

      <main>
        {/* <Route exact path="/admin" component={Home} /> */}
        <Route exact path="/admin/about" component={About} />
      </main>
    </div>
  )
}

export default App
