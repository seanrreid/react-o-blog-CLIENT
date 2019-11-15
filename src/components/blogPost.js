import React, { Component } from "react";
import { loadData } from "../utils/loadData";

class BlogPost extends Component {
  state = {
    post: {},
    comments: [],
    username: "",
    comment: ""
  };

  async componentDidMount() {
    const postId = this.props.match.params.post_id;
    const post_url = `http://localhost:3000/v1/post/${postId}`;
    const comment_url = `http://localhost:3000/v1/post/comments/${postId}`;

    const post = await loadData(post_url);
    const comments = await loadData(comment_url);

    this.setState({
      post,
      comments
    });
  }

  handleChange = e => {
    const { name, value } = e.target;

    this.setState({
      [name]: value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { username, comment } = this.state;
    const post_id = this.props.match.params.post_id;

    const data = { post_id, username, comment };

    this.addComment(data);
  };

  addComment = async data => {
    const response = await fetch("http://localhost:3000/v1/post/add/comment", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
    const reply = await response;
    if (reply.status === 200) {
      alert("Comment Saved!");
    }
    if (reply.status !== 200) {
      alert("womp womp");
    }
  };

  render() {
    const { post, name, comment, comments } = this.state;
    return (
      <div>
        <h2>{post.title}</h2>
        <p>{post.content}</p>
        <div className="comment-form">
          <form onSubmit={this.handleSubmit}>
            <label>
              Your Name
              <input
                type="text"
                value={name}
                placeholder="Your Name"
                name="username"
                onChange={this.handleChange}
              />
            </label>
            <label>
              Your Comment:
              <textarea
                name="comment"
                value={comment}
                placeholder="Your Comment"
                onChange={this.handleChange}
              />
              <button type="submit">Submit</button>
            </label>
          </form>
          <ul>
            {comments.map(comment => (
              <li key={comment.id}>
                <h3>{comment.username} says:</h3>
                <p>{comment.comment}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default BlogPost;
