import React, { Component } from 'react'
import axios from 'axios'
import './App.css'
import Navbar from './components/layout/Navbar'
import Users from './components/users/Users'

class App extends Component {
  componentDidMount() {
    axios
      .get('https://api.github.com/users')
      .then((res) => console.log(res.data))
  }
  render() {
    return (
      <div className='App'>
        <Navbar />
        <div className='container'>
          <Users />
        </div>
      </div>
    )
  }
}

export default App
