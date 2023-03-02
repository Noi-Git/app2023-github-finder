import React, { useState } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import axios from 'axios'
import './App.css'
import Navbar from './components/layout/Navbar'
import Alert from './components/layout/Alert'
import Home from './components/pages/Home'
import About from './components/pages/About'
import NotFound from './components/pages/NotFound'
import User from './components/users/User'

import GithubState from './context/github/GithubState'
import AlertState from './context/alert/AlertState'

const App = () => {
  const [repos, setRepos] = useState([])
  const [loading, setLoading] = useState(false)

  // setup environment for production
  let githubClientId
  let gihubClientSecret

  if (process.env.NODE_ENV !== 'production') {
    githubClientId = process.env.REACT_APP_GITHUB_CLIENT_ID
    gihubClientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET
  } else {
    githubClientId = process.env.GITHUB_CLIENT_ID
    gihubClientSecret = process.env.GITHUB_CLIENT_SECRET
  }

  // Get users repos
  const getUserRepos = async (username) => {
    setLoading(true)

    const res = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${githubClientId}&client_secret=${gihubClientSecret}`
    )
    setRepos(res.data)
    setLoading(false)
  }

  return (
    <GithubState>
      <AlertState>
        <Router>
          <div className='App'>
            <Navbar />
            <div className='container'>
              <Alert />

              <Switch>
                <Route exact path='/'>
                  <Home />
                </Route>
                <Route path='/about'>
                  <About />
                </Route>
                <Route
                  path='/user/:login'
                  render={(props) => (
                    <User
                      {...props}
                      getUserRepos={getUserRepos}
                      repos={repos} //repos that is in the state
                    />
                  )}
                />
                <Route>
                  <NotFound />
                </Route>
              </Switch>
            </div>
          </div>
        </Router>
      </AlertState>
    </GithubState>
  )
}

export default App
