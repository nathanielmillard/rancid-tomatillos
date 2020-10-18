import React from 'react';

import propTypes from 'prop-types';

import './Comment.scss';

const Comment = ({ comment }) => {
	return (
		<article className='comment'>
			<section className='comment-header'>
				<h4 className='comment-title'>Author: {comment.author}</h4>
				<small className='comment-date'>
					{new Date(comment.created_at).toLocaleString()}
				</small>
			</section>
			<p className='comment-body'>{comment.comment}</p>
		</article>
	);
};

export default Comment;

Comment.propTypes = {
  comment: propTypes.object.isRequired
}
