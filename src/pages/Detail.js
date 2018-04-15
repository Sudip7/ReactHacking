import React from "react";
import { render } from "react-dom";
import axios from "axios";

class Detail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      commits: [],
      forks: [],
      pulls: [],
      view: ""
    };
  }

  fetchFeed(type) {
    console.log(this.props.match.params.repo, type);
    return axios.get(
      `https://api.github.com/repos/facebook/${
        this.props.match.params.repo
      }/${type}`
    );
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
          console.log(a, b, c);
          this.setState({
            commits: a.data,
            forks: b.data,
            pulls: c.data
          });
        })
      );
  }

  buttonClicked(view) {
    this.setState({ view });
  }

  renderCommits() {
    return this.state.commits.map((commit, index) => {
      const author = commit.author ? commit.author.login : "Anonymous";

      return (
        <p key={index}>
          <strong>{author}</strong>:
          <a href={commit.html_url}>{commit.commit.message}</a>.
        </p>
      );
    });
  }

  renderForks() {
    return this.state.forks.map((fork, index) => {
      const owner = fork.owner ? fork.owner.login : "Anonymous";

      return (
        <p key={index}>
          <strong>{owner}</strong>: forked to
          <a href={fork.html_url}>{fork.html_url}</a> at {fork.created_at}.
        </p>
      );
    });
  }

  renderPulls() {
    return this.state.pulls.map((pull, index) => {
      const user = pull.user ? pull.user.login : "Anonymous";

      return (
        <p key={index}>
          <strong>{user}</strong>:
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
