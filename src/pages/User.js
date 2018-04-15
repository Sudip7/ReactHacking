import React from "react";
import { render } from "react-dom";
import axios from "axios";
import { NavLink, Link } from "react-router-dom";

const BASE_URL = "https://api.github.com/users";

class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: []
    };
  }

  fetchEvents() {
    return axios.get(`${BASE_URL}/${this.props.match.params.username}/events`);
  }

  componentWillMount() {
    this.fetchEvents()
      .then(response => {
        this.setState({ events: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        <p>
          You are here: &nbsp;&nbsp;
          <NavLink to="/" activeClassName="active">
            Home
          </NavLink>{" "}
          > {this.props.match.params.username}
        </p>
        {this.state.events.map((event, index) => {
          const { actor, repo, payload, type } = event;
          const { url = null, avatar_url = null, login = "Anonymous" } = actor;
          const { commits = [] } = payload;
          return (
            <div key={index}>
              <img src={avatar_url} alt="avatar url" width="100" height="100" />
              <p>
                Type: {type}
                <br />
                Username: {login}&nbsp;&nbsp; (<a href={url} target="_blank">
                  {url}
                </a>)
              </p>
              <p>
                Contributed Repo: {repo.name}&nbsp;&nbsp;(
                <a href={repo.url} target="_blank">
                  {repo.url}
                </a>
                )
                <br />
              </p>
              {commits.length > 0 ? <p>Commit History</p> : <p>&nbsp;</p>}
              <ol>
                {commits.map((commit, index2) => {
                  const message = commit.message ? commit.message : "N/A";
                  const commitKey = `commit-${index2}`;
                  return <li key={commitKey}>{message}</li>;
                })}
              </ol>
              <hr />
            </div>
          );
        })}
      </div>
    );
  }
}

export default User;
