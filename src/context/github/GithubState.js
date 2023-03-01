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
  GET_REPOS,
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

  // Search Users

  // Get Users

  // Get Repositories

  // Clear Users

  // Set Loading

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        user: state.user,
        repos: state.repos,
        loading: state.loading,
      }} // make these available to the entire app
    >
      {props.children}
    </GithubContext.Provider>
  )
}

export default GithubState
