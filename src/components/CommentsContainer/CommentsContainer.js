import React, { Component } from 'react';

import Comment from '../Comment/Comment';

import { getAllMovieComments } from '../../apiCalls';

export default class CommentsContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      comments: [],
      comment: '',
      error: '',
      loading: ''
    }
  }

  //  get all comments
  componentDidMount = () => {
    this.retrieveAllComments();
  }

  retrieveAllComments = () => {
    getAllMovieComments(this.props.movieID)
      .then(response => this.setState(response));
  }

  // submit comment
  submitComment = () => {
    const commentData = {
      id: Date.now(),
      movieId: +this.props.movieID,
      author: this.props.userID,
      comment: this.state.comment,
      created_at: Date.now()
    };
    this.setState({ comments: [...this.state.comments, commentData] });
    this.resetInputs();
    // this.retrieveAllComments();
  }

  // updateCommentsState
  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  // reset inputs
  resetInputs = () => {
    this.setState({ comment: '' });
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
                return <h1>{comment.created_at}</h1>
              })
            }
          </section>
        }
        {(this.state.error || this.state.loading) && <h2>{this.state.error || this.state.loading}</h2>}
      </>
    )
  }
}