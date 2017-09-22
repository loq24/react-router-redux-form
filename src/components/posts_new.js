import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { createPost } from '../actions';
import {connect} from 'react-redux';

class PostsNew extends Component{
	constructor(props){
		super(props);
		this.state = {
			isLoading: false
		};
	}
	renderField({label, type, input, name, meta: { touched, error }}){
		const className = `form-group ${touched && error ? 'has-danger' : ''}`;
		return ( 
			<div className={className}>
				<label>{label}</label>	
				<input 
					className="form-control"
					type={type}
					name={name}
					{...input}
				/>
				{touched && (error && <span className="text-help">{error}</span>)}
			</div> 
		);
	}

	renderTextArea({label, name, input, meta: { touched, error }}){
		const className = `form-group ${touched && error ? 'has-danger' : ''}`;
		return ( 
			<div className={className}>
				<label>{label}</label>	
				<textarea 
					className="form-control"
					name={name}
					{...input}
				/>
				{touched && (error && <span className="text-help">{error}</span>)}
			</div> 
		);
	}

	onSubmit( values ){
		this.setState({isLoading: true});
		this.props.createPost(values, () => {
			this.setState({isLoading: false});	
			this.props.history.push('/');
		});
	}

	render(){
		const { handleSubmit, pristine, reset, submitting } = this.props;
		return(
			<div>
				<form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
					<Field 
						label="Title"
						name="title"
						type="text"
						component={this.renderField}
					/>
					<Field 
						label="Categories"
						name="categories"
						type="text"
						component={this.renderField}
					/>
					<Field 
						label="Post Content"
						name="content"
						component={this.renderTextArea}
					/>
					<div className="form-group">
				        <button style={{marginRight:"10px"}} type="submit" className="btn btn-primary" disabled={submitting}>Submit</button>
				        {this.state.isLoading && <span>Loading...</span>}
				        <button type="button" className="btn"  disabled={pristine || submitting} onClick={reset}>Clear Values</button>
			      	</div>
				</form>
				<Link className="btn btn-danger" to="/">&laquo; Back</Link>
			</div>
		);
	}
}

const validate = values => {
	const errors = {};
	if(values.title && values.title.length < 3){
		errors.title = 'Title must be atleast 3 characters';
	}
	if (!values.title) {
	    errors.title = 'Enter a title.';
	}
	if (!values.categories) {
	    errors.categories = 'Enter some categories.';
	}
	if (!values.content) {
	    errors.content = 'Enter some content please.';
	}
	return errors;
}

export default reduxForm({
	validate: validate,
	form: 'PostsNewForm',
})(connect(null, { createPost })(PostsNew));