import React, { Component } from 'react';

class MainWritingArea extends Component {
  state = {
    noteBody: "",
    noteTitle: "My awesome day at the beach"
  }

  updateNoteText(noteText) {
    this.setState({noteBody: noteText.target.value});
  }

  updateNoteTitle(noteTitle) {
    this.setState({noteTitle: noteTitle.target.value});
  }

  render() {

    return (
      <div className="MainWritingArea">

        <input type="text" className="textTitle" value={this.state.noteTitle} onChange={noteTextTtitle => this.updateNoteTitle(noteTextTtitle)} />
        <input type="text" className="textBody" value={this.state.noteBody} onChange={noteTextTarget => this.updateNoteText(noteTextTarget)} />
        <button >save</button>
        {this.state.noteBody}
      </div>
    );
  }
}

export default MainWritingArea;