import React, { Component } from 'react'
import axios from 'axios'
import './App.css'
import Navbar from './components/layout/Navbar'
import Users from './components/users/Users'
import Search from './components/users/Search'

class App extends Component {
  state = {
    users: [],
    loading: false,
  }

  async componentDidMount() {
    this.setState({ loading: true })

    const res = await axios.get(
      `https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    )
    this.setState({ users: res.data, loading: false })
  }

  searchUsers = (text) => {
    //received 'text' from the imput field Search.js
    console.log(text)
  }

  render() {
    return (
      <div className='App'>
        <Navbar />
        <div className='container'>
          {/* 
             <Search searchUsers={this.searchUsers} />
             Receive props from child Search.js 
               - once get the props 'text'
               - it will call SearchUsers()
               - and passed the text along to the function as a parameter
          */}
          <Search searchUsers={this.searchUsers} />
          <Users loading={this.state.loading} users={this.state.users} />
        </div>
      </div>
    )
  }
}

export default App
