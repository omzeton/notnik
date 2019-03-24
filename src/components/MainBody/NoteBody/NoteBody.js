import React, { Component } from 'react';
import ContentEditable from 'react-contenteditable';

import { connect } from 'react-redux';
import * as actionCreators from '../../../store/actions';

import './NoteBody.css';

class NoteBody extends Component {
	state = {
		textBody: this.props.text
	}
  
  handleChange = evt => {
      this.setState({ textBody: evt.target.value });
      this.props.onGetNewTextBody(this.state.textBody);
    };

  render() {
    return (
      <div className="NoteBody">
	      	<ContentEditable
	      				  className="NoteBody__Text"
	      	              html={this.state.textBody} // innerHTML of the editable div
	      	              disabled={false}       // use true to disable editing
	      	              onChange={this.handleChange} // handle innerHTML change
	      	            />
      </div>
    );
  }
}

const mapStateToProps = state => {
	return {
		textBody: state.export.textBody
	}
}

const mapDispatchToProps = dispatch => {
  return {
    onGetNewTextBody: (cargo) => dispatch(actionCreators.getNewTextBody(cargo))
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(NoteBody);