import React, { Component } from 'react'

export class Search extends Component {
  state = {
    text: '',
  }

  onChange = (e) => {
    // this.setState({ text: e.target.value })
    this.setState({ [e.target.name]: e.target.value }) // reuseable onChange - will target name that associated with each input name
  }

  onSubmit = (e) => {
    e.preventDefault()
    this.props.searchUsers(this.state.text) //searchUsers is a props that we passed up to the App.js
    this.setState({ text: '' })
    /*
       When user click Submit button
         - it call onSubmit()
         - inside of onSubmit -- it call searchUsers and passed 'text' to App.js
    */
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit} className='form'>
          <input
            type='text'
            value={this.state.text}
            name='text'
            placeholder='Search users...'
            onChange={this.onChange}
          />
          <input
            type='submit'
            value='Search'
            name='submitSearch'
            className='btn btn-dark btn-block'
          />
        </form>
      </div>
    )
  }
}

export default Search
