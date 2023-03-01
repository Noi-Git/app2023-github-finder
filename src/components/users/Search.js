import React, { useState, useContext } from 'react'
import PropTypes from 'prop-types'
import GithubContext from '../../context/github/githubContext'

const Search = ({ setAlert }) => {
  // initialize githubContext
  const githubContext = useContext(GithubContext)

  const [text, setText] = useState('')

  const onChange = (e) => {
    setText(e.target.value)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    if (text === '') {
      setAlert('Please enter something', 'light')
    } else {
      githubContext.searchUsers(text)
      setText('')
    }
  }

  return (
    <div>
      <form onSubmit={onSubmit} className='form'>
        <input
          type='text'
          value={text}
          name='text'
          placeholder='Search users...'
          onChange={onChange}
        />
        <input
          type='submit'
          value='Search'
          name='submitSearch'
          className='btn btn-dark btn-block'
        />
      </form>
      {githubContext.users.length > 0 && (
        <button
          className='btn btn-light btn-block'
          onClick={githubContext.clearUsers} //we are sending this up to App.js
        >
          Clear
        </button>
      )}
    </div>
  )
}

Search.propTypes = {
  setAleart: PropTypes.func,
}

export default Search
