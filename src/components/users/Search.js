import React, { Component } from 'react'
import PropTypes from 'prop-types'

export class Search extends Component {
  state = {
    text: '',
  }
  static propTypes = {
    searchUsers: PropTypes.func.isRequired,
    clearUsers: PropTypes.func.isRequired,
    showClear: PropTypes.bool.isRequired,
  }

  onChange = (e) => {
    // this.setState({ text: e.target.value })
    this.setState({ [e.target.name]: e.target.value })
  }

  onSubmit = (e) => {
    e.preventDefault()
    this.props.searchUsers(this.state.text)
    this.setState({ text: '' })
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
        {this.props.showClear && (
          <button
            className='btn btn-light btn-block'
            onClick={this.props.clearUsers} //we are sending this up to App.js
          >
            Clear
          </button>
        )}
      </div>
    )
  }
}

export default Search
