import React, { Component } from 'react';
import propTypes from 'prop-types';

import Comment from '../Comment/Comment';

import { getAllMovieComments, postMovieComment } from '../../apiCalls';

import './Comments.scss';

export default class Comments extends Component {
	constructor(props) {
		super(props);
		this.state = {
			comments: [],
			comment: '',
			error: '',
			loading: '',
		};
	}

	componentDidMount = () => {
		this.retrieveAllComments();
	};

	retrieveAllComments = () => {
		getAllMovieComments(this.props.movieID).then(response =>
			this.setState(response)
		);
	};

	submitComment = () => {
		if (!this.state.comment.trim()) {
			this.setState({
				error: 'You must have a comment before submitting a comment',
			});
			return;
		}
		const commentData = {
			id: Date.now(),
			movieId: +this.props.movieID,
			author: this.props.userID,
			comment: this.state.comment,
			created_at: Date.now(),
		};
		postMovieComment(commentData.movieId, commentData).then(response => 
			this.setState({ comments: [...this.state.comments, response.newComment ],  loading: '', error: ''}));
		this.resetInputs();
		this.retrieveAllComments();
	};

	handleChange = event => {
		const { name, value } = event.target;
		this.setState({ [name]: value });
	};

	resetInputs = () => {
		this.setState({ comment: '' });
	};

	render() {
		return (
			<section className='comments-container'>
				{this.props.userID ? (
					<form className='comment-form'>
						<label htmlFor='comment'>Submit A New Comment</label>
						<textarea
							rows='2'
							name='comment'
							value={this.state.comment}
							onChange={this.handleChange}
						/>
						<button type='button' onClick={() => this.submitComment()}>
							Submit
						</button>
					</form>
				) : (
					<h2 className='comment-login'>Login to comment on this movie!</h2>
				)}
				{this.state.comments.length < 1 ? (
					''
				) : (
					<section className='comments'>
						{this.state.comments.map(comment => {
							return <Comment key={comment.id} comment={comment} />;
						})}
					</section>
				)}
				{(this.state.error || this.state.loading) && (
					<h2 className='comment-status'>
						{this.state.error || this.state.loading}
					</h2>
				)}
			</section>
		);
	}
}

Comments.propTypes = {
	movieID: propTypes.string.isRequired,
	userID: propTypes.string,
};
