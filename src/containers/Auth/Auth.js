import React, { Component } from 'react';
import Loader from '../../components/Loader/Loader';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';

import './Auth.css';

class Auth extends Component {
	state = {
		logReg: true,
		regSuccess: true
	}


	toggleMode = () => {
		this.setState((prevState, props) => {
			return {
				logReg: !prevState.logReg
			}
		})
	}

	submitHandler = () => {

		if(!this.state.logReg) {

			if (this.password1.value !== this.password2.value) {
				this.setState({regSuccess: false});
			} else {
				this.setState({regSuccess: true});
				this.props.onAuth(this.email.value, this.password2.value, this.state.logReg);
			}

		} else {
			this.props.onAuth(this.email.value, this.password.value, this.state.logReg);
		}
		
	}

	render() {

		let errorMsg,
			styledMsg,
			regInputStyle = this.state.regSuccess ? "" : "mismatch";

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

		let heading = this.state.logReg ? 'Log in' : 'Register';

		let buttons = this.state.logReg ? 
				<div className="Auth__Container__Buttons">
					<input type="submit" value="Log In" onClick={this.submitHandler}/>
					<input type="submit" value="Register" onClick={this.toggleMode}/>
				</div>
				:
				<div className="Auth__Container__Buttons">
					<input type="submit" value="Register" onClick={this.submitHandler}/>
					<input type="submit" value="Back" onClick={this.toggleMode}/>
				</div>;

		let password = this.state.logReg ?
			[<input type="password" placeholder="Password" key="i1" ref={(input) => {this.password = input}}/>]
			:
			[<input type="password" className={regInputStyle} placeholder="Password" key="i2" ref={(input) => {this.password1 = input}}/>,
			<input type="password" className={regInputStyle} placeholder="Repeat password" key="i3" ref={(input) => {this.password2 = input}}/>];


		return (
			<div className="Auth">
				<div className="Auth__Container">
					<div className="Auth__Container__Heading">
						<h2>{heading}</h2>
					</div>
					<input type="text" placeholder="Email address" ref={(input) => {this.email = input}}/>
					{password}
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
		onAuth: (email, password, logReg ) => dispatch(actions.authenticate(email, password, logReg))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);