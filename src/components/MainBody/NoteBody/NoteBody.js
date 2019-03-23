import React, { Component } from 'react';
import ContentEditable from 'react-contenteditable';

import './NoteBody.css';

class NoteBody extends Component {
	state = {
		textBody: this.props.text
	}
  
  handleChange = evt => {
      this.setState({ textBody: evt.target.value });
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

export default NoteBody;