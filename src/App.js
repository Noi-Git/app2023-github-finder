import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import axios from 'axios'
import './App.css'
import Navbar from './components/layout/Navbar'
import Users from './components/users/Users'
import Search from './components/users/Search'
import Alert from './components/layout/Alert'
import About from './components/pages/About'
import User from './components/users/User'

class App extends Component {
  state = {
    users: [],
    user: {}, // store a single user
    repos: [],
    loading: false,
    alert: null,
  }

  // async componentDidMount() {
  //   this.setState({ loading: true })

  //   const res = await axios.get(
  //     `https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
  //   )
  //   this.setState({ users: res.data, loading: false })
  // }

  searchUsers = async (text) => {
    this.setState({ loading: true })

    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    )
    this.setState({ users: res.data.items, loading: false })
  }

  clearUsers = () => this.setState({ users: [], loading: false })

  setAlert = (msg, type) => {
    this.setState({ alert: { msg, type } }) //put alert into the state which we can see it from react state dev tool

    setTimeout(() => this.setState({ alert: null }), 3000)
  }

  // Get single Github user
  getUser = async (username) => {
    this.setState({ loading: true })

    const res = await axios.get(
      `https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    )
    console.log('from getUser:-- ', res)
    this.setState({ user: res.data, loading: false })
  }

  // Get users repos
  getUserRepos = async (username) => {
    this.setState({ loading: true })

    const res = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    )
    console.log('from getUserRepos:-- ', res)
    this.setState({ repos: res.data, loading: false })
  }

  render() {
    const { users, user, repos, loading, alert } = this.state

    return (
      <Router>
        <div className='App'>
          <Navbar />
          <div className='container'>
            <Alert alert={alert} />

            <Switch>
              <Route
                exact
                path='/'
                render={(props) => (
                  <>
                    <Search
                      searchUsers={this.searchUsers}
                      clearUsers={this.clearUsers}
                      showClear={users.length > 0 ? true : false}
                      setAlert={this.setAlert}
                    />
                    <Users loading={loading} users={users} />
                  </>
                )}
              />
              <Route exact path='/about' component={<About />} />
              <Route
                // path='/user/:login'
                //   element={<User getUser={this.getUser} user={user} />}

                path='/user/:login'
                render={(props) => (
                  <User
                    {...props}
                    getUser={this.getUser}
                    getUserRepos={this.getUserRepos}
                    user={user}
                    repos={repos} //repos that is in the state
                    loading={loading}
                  />
                )}
              />
            </Switch>
          </div>
        </div>
      </Router>
    )
  }
}

export default App
