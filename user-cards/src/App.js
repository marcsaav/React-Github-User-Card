import React, { Component } from 'react'
import axios from 'axios'

class App extends Component {
  state = {
    userGit: [],
    gitUser: '',
    userFollowers: []
  }

  fetchUser = (user) => {
    axios
      .get(`https://api.github.com/users/${user}`)
      .then((res) => {
        this.setState({
          userGit: res.data
        })
      })
      .catch((err) => {
        debugger
      })
  }

  fetchUserFollowers = (user) => {
    axios
    .get(`https://api.github.com/users/${user}/followers`)
    .then((res) => {
      this.setState({
        userFollowers: res.data
      })
    })
    .catch((err) => {
      debugger
    })
  }

  handleChange = (evt) => {
    this.setState({
      gitUser: evt.target.value
    })
  }

  handleSubmit = (evt) => {
    evt.preventDefault()
    this.fetchUser(this.state.gitUser)
    this.fetchUserFollowers(this.state.gitUser)
    this.setState({
      gitUser: ''
    })
  }

  componentDidMount() {
    this.fetchUser('marcsaav')
    this.fetchUserFollowers('marcsaav')
  }

  render () {
    return(
      <div>
        <h1>GitHub Profiles For You</h1>
        <form onSubmit={this.handleSubmit}>
          <label> Fetch a GitHub User:
            <input
            type='text'
            name='user'
            placeholder='...GitHub Username'
            value={this.state.gitUser}
            onChange={this.handleChange}
            >
            </input>
          </label>
          <button>Get User</button>
        </form>
        <div>
          <h2>{this.state.userGit.name}</h2>
          <img src={this.state.userGit.avatar_url} width='200'/>
          <a href={this.state.userGit.html_url}>Profile</a>
          <h4>Location: {this.state.userGit.location}</h4>
          <h4>Bio:</h4>
            <p>{this.state.userGit.bio}</p>
        </div>
        <div>
          <h3>Followers:</h3>
          {this.state.userFollowers.map((follower) => {
            return(
              <div>
                <h4>{follower.login}</h4>
                <img src={follower.avatar_url} width='200'/>
                <a href={follower.html_url} target='_blank'>Profile</a>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

export default App;
