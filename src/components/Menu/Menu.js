import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions';
import './Menu.css';

class Menu extends Component {
	render() {
		return (
			<div className="Menu">
			<div></div>

			<NavLink to="/" exact><div className={['button', 'button-list'].join(' ')}></div></NavLink>
			<NavLink to={'/entry/' + this.props.index} exact><div className={['button', 'button-entry'].join(' ')}></div></NavLink>
			<div className={['button', 'button-save'].join(' ')}></div>
			<div></div>
		</div>
		);
	}
};

const mapStateToProps = state => {
  return {
      index: state.currentIndex
  };
};

export default connect(mapStateToProps, null)(Menu);