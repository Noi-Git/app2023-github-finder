// initial state and action
import React, { useReducer } from 'react'
import axios from 'axios'
import GithubContext from './githubContext'
import GithubReducer from './githubReducer'
import {
  SEARCH_USERS,
  SET_LOADING,
  CLEAR_USERS,
  GET_USER,
  // GET_REPOS,
} from '../types'

/* 
   all global states we currently have in the App.js before refactoring
     - these will include all actions
     - which will send order to dispatch the reducer
     Ex. make a request to GitHub --> get response --> dispatch the type back to reducer
*/
const GithubState = (props) => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false,
  }

  /* ====
    We call an action = make request to GitHub
      - we get reponse
      - dispatch a type back to reducer
  */
  const [state, dispatch] = useReducer(GithubReducer, initialState)

  // Search Github users = make a request
  const searchUsers = async (text) => {
    setLoading()
    /* the setLoading() will dispatch SET_LOADING.
       this line: const setLoading = () => dispatch({type: SET_LOADING})
     */

    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    )

    /* Before refactor to useContext: setUsers(res.data.items)
        - the type in the dispatch --> will be send to githubReducer.js
    */
    dispatch({
      type: SEARCH_USERS,
      payload: res.data.items,
    })
  }

  // Get single Github user
  const getUser = async (username) => {
    setLoading()

    const res = await axios.get(
      `https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    )

    dispatch({
      type: GET_USER,
      payload: res.data,
    })
  }

  // Get Repositories
  // .match.params doesn't work will keep the code as props

  // Clear Users
  const clearUsers = () => dispatch({ type: CLEAR_USERS })

  // Set Loading
  const setLoading = () => dispatch({ type: SET_LOADING })

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        user: state.user,
        repos: state.repos,
        loading: state.loading,
        searchUsers,
        clearUsers,
        getUser,
      }} // make these available to the entire app
    >
      {props.children}
    </GithubContext.Provider>
  )
}

export default GithubState
