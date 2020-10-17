import React, { Component } from 'react';

import Comment from '../Comment/Comment'

export default class CommentsContainer extends Component {
  constructor() {
    super();

    this.state = {
      comments: [],
      title: '',
      body: ''
    }
  }

  //  get all comments

  // submit comment

  // updateCommentsState

  // reset inputs

  render() {
    return (
      <>
        <form>
          <label htmlFor='title'>Title:</label>
          <input type='text' name='title' />
          <label htmlFor='body'>Body:</label>
          <textarea rows='2' name='body' />
          <button type='button'>Submit</button>
        </form>
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