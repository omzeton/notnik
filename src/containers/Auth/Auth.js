import React, { Component } from 'react';
import Loader from '../../components/Loader/Loader';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';

import './Auth.css';

class Auth extends Component {
	state = {
		isSignin: true
	}

	toggleMode = () => {
		this.setState((prevState, props) => {
			return {
				isSignin: !prevState.isSignin
			}
		})
	}

	submitHandler = (event) => {
		event.preventDefault();
		this.props.onAuth(this.email.value, this.password.value, this.state.isSignin);
	}

	render() {
		let errorMsg,
			styledMsg;

		if (this.props.loading) {
			errorMsg = <Loader />;
		}

		if (this.props.error) {

			let e = this.props.error.message;

			switch (e) {
				case "INVALID_EMAIL" :
				case "INVALID_PASSWORD" :
					styledMsg = "Wrong email or password";
					break;
				case "WEAK_PASSWORD : Password should be at least 6 characters":
					styledMsg = "Password should be at least 6 characters long";
					break;
				case "EMAIL_EXISTS" :
					styledMsg = "This email is already taken";
					break;
				default:
					return styledMsg;
			}

			errorMsg = (
				<p>{styledMsg}</p>
			);
		}

		let heading = this.state.isSignin ? 'Log in' : 'Register';

		let buttons = this.state.isSignin ? 
				<div className="Auth__Container__Buttons">
					<input type="submit" value="Log In" onClick={this.submitHandler}/>
					<input type="submit" value="Register" onClick={this.toggleMode}/>
				</div>
				:
				<div className="Auth__Container__Buttons">
					<input type="submit" value="Register" onClick={this.submitHandler}/>
					<input type="submit" value="Back" onClick={this.toggleMode}/>
				</div>;

		return (
			<div className="Auth">
				<div className="Auth__Container">
					<div className="Auth__Container__Heading">
						<h2>{heading}</h2>
					</div>
					<input type="text" placeholder="Email address" ref={(input) => {this.email = input}}/>
					<input type="password" placeholder="Password" ref={(input) => {this.password = input}}/>
					{buttons}
					<div className="Auth__Container__Popup">
						{errorMsg}
					</div>
				</div>
			</div>
		)
	};
};

const mapStateToProps = state => {
	return {
		loading: state.auth.loading,
		error: state.auth.error,
		token: state.auth.token
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onAuth: (email, password, isSignin ) => dispatch(actions.auth(email, password, isSignin))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);