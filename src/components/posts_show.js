import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import { deletePost, fetchPost } from '../actions';

class PostsShow extends Component{
	handlePostDeletion(id){
		this.props.deletePost(id,() => {
			this.props.history.push('/');
		});
	}

	componentWillMount(){
		const { id }  = this.props.match.params;
		this.props.fetchPost(id);
	}

	render(){
		const { post, match: { params: { id } } } = this.props;
		if(!post){
			return <div>Loading....</div>;
		}		
		const { title, categories, content } = post;
		return(
			<div className="container" style={{marginTop: "25px"}}>
				<button className="btn btn-danger pull-xs-right" onClick={this.handlePostDeletion.bind(this, id)}>Delete Post</button>
				<Link to='/'>&laquo; Back to Posts</Link>
				<h3 style={{marginTop: "20px"}}>{title}</h3>
				<h6>{categories}</h6>
				<p>{content}</p>
			</div>
		);
	}
}

function mapToStateToProps({posts}, ownProps){
	return { 
		post: posts[ownProps.match.params.id]
	};
}

export default connect(mapToStateToProps, { deletePost, fetchPost })(PostsShow);