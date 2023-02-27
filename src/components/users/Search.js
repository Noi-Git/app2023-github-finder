import React, { Component } from 'react'

export class Search extends Component {
  state = {
    text: '',
  }

  render() {
    return (
      <div>
        <form className='form'>
          <input
            type='text'
            value={this.state.text}
            name='text'
            placeholder='Search users...'
          />
          <input
            type='submit'
            value='Search'
            className='btn btn-dark btn-block'
          />
        </form>
      </div>
    )
  }
}

export default Search
