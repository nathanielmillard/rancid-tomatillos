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

  // updateCommentsState
  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  // reset inputs
  resetInputs = () => {
    this.setState({ title: '', comment: ''});
  }

  render() {
    return (
      <>
      {
        (this.props.userID) ?
        <form>
          <label htmlFor='comment'>Comment:</label>
          <textarea rows='2' name='comment' value={this.state.comment} onChange={this.handleChange} />
          <button type='button'>Submit</button>
        </form> :
        <h2>Login to comment on this movie!</h2>
      }
        {
          (this.state.comments.length > 1) ? '' 
          :
          <section className='comments'>
            <Comment />
          </section>
        }
      </>
    )
  }
}