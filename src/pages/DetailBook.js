import React from "react";
import { NavLink, Link } from "react-router-dom";
import axios from "axios";

const baseURL = "https://api.github.com/repos/facebook";

class Detail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      commits: [],
      forks: [],
      pulls: [],
      view: "commits"
    };
  }

  fetchFeed(type) {
    //console.log("test", this.props.match.params.repo);
    if (this.props.match.params.repo === "") {
      // empty repo name, bail out!
      return;
    }
    console.log("test", this.props.match.params.repo);
    return axios.get(`${baseURL}/${this.props.match.params.repo}/${type}`);
  }

  componentWillMount() {
    axios
      .all([
        this.fetchFeed("commits"),
        this.fetchFeed("forks"),
        this.fetchFeed("pulls")
      ])
      .then(
      axios.spread((a, b, c) => {
        this.setState({
          commits: (a && a.data) || [],
          forks: (b && b.data) || [],
          pulls: (c && c.data) || []
        });
      })
      );
    // this.setState({
    //   commits: [
    //     {
    //       author: { login: "harry potter" },
    //       html_url: "http://www.google.com",
    //       commit: { message: "Hello World. Rate limit sucks" }
    //     }
    //   ],
    //   forks: [],
    //   pulls: []
    // });
  }

  buttonClicked(view) {
    this.setState({ view });
  }

  renderCommits() {
    return this.state.commits.map((commit, index) => {
      const author = commit.author ? commit.author.login : "Anonymous";
      const userPath = `/user/${author}`;
      return (
        <p key={index}>
          <Link to={userPath}>
            <strong>{author}</strong>
          </Link>:
          <a href={commit.html_url}>{commit.commit.message}</a>.
        </p>
      );
    });
  }

  renderForks() {
    return this.state.forks.map((fork, index) => {
      const owner = fork.owner ? fork.owner.login : "Anonymous";
      const userPath = `/user/${owner}`;
      return (
        <p key={index}>
          <Link to={userPath}>
            <strong>{owner}</strong>
          </Link>: forked to
          <a href={fork.html_url}>{fork.html_url}</a> at {fork.created_at}.
        </p>
      );
    });
  }

  renderPulls() {
    return this.state.pulls.map((pull, index) => {
      const user = pull.user ? pull.user.login : "Anonymous";
      const userPath = `/user/${user}`;
      return (
        <p key={index}>
          <Link to={userPath}>
            <strong>{user}</strong>
          </Link>:
          <a href={pull.commits_url}>{pull.title}</a>.
        </p>
      );
    });
  }

  render() {
    let content = this.renderCommits();
    if (this.state.view === "commits") {
      content = this.renderCommits();
    } else if (this.state.view === "forks") {
      content = this.renderForks();
    } else if (this.state.view === "pulls") {
      content = this.renderPulls();
    }
    return (
      <div>
        <p>
          You are here:&nbsp;&nbsp;
          <NavLink to="/" activeClassName="active">
            Home
          </NavLink>{" "}
          > {this.props.match.params.repo}
        </p>
        <button onClick={this.buttonClicked.bind(this, "commits")}>
          Show Commits
        </button>
        <button onClick={this.buttonClicked.bind(this, "forks")}>
          Show Forks
        </button>
        <button onClick={this.buttonClicked.bind(this, "pulls")}>
          Show Pulls
        </button>
        <p>Current View: {this.state.currentView}</p>
        {content}
      </div>
    );
  }
}

export default Detail;
