import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Spinner from '../layout/Spinner'
import PropTypes from 'prop-types'
import Repos from '../repos/Repos'

export class User extends Component {
  static propTypes = {
    loading: PropTypes.bool,
    user: PropTypes.object.isRequired,
    repos: PropTypes.array.isRequired,
    getUser: PropTypes.object.isRequired,
    getUserRepos: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.props.getUser(this.props.match.params.login)
    this.props.getUserRepos(this.props.match.params.login)
  }

  render() {
    const {
      name,
      company,
      avatar_url,
      location,
      bio,
      blog,
      login,
      html_url,
      followers,
      following,
      public_repos,
      public_gists,
      hireable,
    } = this.props.user

    const { loading, repos } = this.props

    if (loading) return <Spinner />
    return (
      <>
        <Link to='/' className='btn btn-light'>
          Back To Search
        </Link>
        Hireable:{' '}
        {hireable ? (
          <i className='fas fa-check text-success' />
        ) : (
          <i className='fas fa-fa-times-circle text-danger' />
        )}
        <div className='card grid-2'>
          <div className='all-center'>
            <img src={avatar_url} alt={name} style={{ width: '150px' }} />
            <h1>{name}</h1>
            <p>Location: {location}</p>
          </div>
          <div>
            {bio && (
              <>
                <h3>Bio</h3>
                <p>{bio}</p>
              </>
            )}
            <a href={html_url} className='btn btn-dark my-1'>
              Visit GitHub Profile
            </a>
            <ul>
              <li>
                {login && (
                  <p>
                    <span className='text-bold'>Username:</span> {login}
                  </p>
                )}
              </li>
              <li>
                {company && (
                  <p>
                    <span className='text-bold'>Company:</span> {company}
                  </p>
                )}
              </li>
              <li>
                {blog && (
                  <p>
                    <span className='text-bold'>Website:</span> {blog}
                  </p>
                )}
              </li>
            </ul>
          </div>
        </div>
        <div className='card text-center'>
          <div className='badge badge-primary'>Followers: {followers}</div>
          <div className='badge badge-success'>Following: {followers}</div>
          <div className='badge badge-light'>Public Repos: {followers}</div>
          <div className='badge badge-dark'>Public Gists: {followers}</div>
        </div>
        <Repos repos={repos} />
      </>
    )
  }
}

export default User
