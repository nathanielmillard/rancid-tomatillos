import React, { Component } from 'react';

import Comment from '../Comment/Comment'

export default class CommentsContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      comments: [],
      comment: ''
    }
  }

  //  get all comments

  // submit comment
  submitComment = () => {
    const commentData = {
      id: Date.now(),
      author: this.props.userID,
      comment: this.state.comment,
      created_at: Date.now()
    };
    this.setState({ comments: [...this.state.comments, commentData.comment] });
    this.resetInputs();
  }

  // updateCommentsState
  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  // reset inputs
  resetInputs = () => {
    this.setState({ comment: ''});
  }

  render() {
    return (
      <>
      {
        (!this.props.userID) ?
        <form>
          <label htmlFor='comment'>Comment:</label>
          <textarea rows='2' name='comment' value={this.state.comment} onChange={this.handleChange} />
          <button type='button' onClick={() => this.submitComment()}>Submit</button>
        </form> :
        <h2>Login to comment on this movie!</h2>
      }
        {
          (this.state.comments.length < 1) ? '' 
          :
          <section className='comments'>
            {
              this.state.comments.map(comment => {
                return <Comment comment={comment} />
              })
            }
          </section>
        }
      </>
    )
  }
}