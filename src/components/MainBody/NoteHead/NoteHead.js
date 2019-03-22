import React, { Component } from 'react';

import './NoteHead.css';

class NoteHead extends Component {

  render() {

    return (
      <div className="NoteHead">
      	<h2>{this.props.header}</h2>
      </div>
    );
  }
}

export default NoteHead;