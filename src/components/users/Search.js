import React from 'react'

const Search = () => {
  return (
    <div>
      <form className='form'>
        <input type='text' name='text' placeholder='Search users...' />
        <input
          type='submit'
          value='Search'
          className='btn btn-dark btn-block'
        />
      </form>
    </div>
  )
}

export default Search
