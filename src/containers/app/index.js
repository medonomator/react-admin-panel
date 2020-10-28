import React from 'react'
import { Route, Link } from 'react-router-dom'
import Home from '../home'
import About from '../about'

const App = () => (
  <div>
    <header>
 
    </header>

    <main>
      <Route exact path="/" component={Home} />

    </main>
  </div>
)

export default App
