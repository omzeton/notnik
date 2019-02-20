import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    noteBody: "",
    noteTitle: ""
  }

  updateNoteText(noteText) {
    this.setState({noteBody: noteText.target.value});
  }

  updateNoteTitle(noteTitle) {
    this.setState({noteTitle: noteTitle.target.value});
  }

  render() {
    return (
      <div className="App">

        <h1>Notnik</h1>

        <input type="text" className="textTitle" value={this.state.noteTitle} onChange={noteTextTtitle => this.updateNoteTitle(noteTextTtitle)} />
        {this.state.noteTitle}
        <p className="textDate">date</p>
        <input type="text" className="textBody" value={this.state.noteBody} onChange={noteTextTarget => this.updateNoteText(noteTextTarget)} />
        <button >save</button>
        {this.state.noteBody}
      </div>
    );
  }
}

export default App;

/*

1. Input title
2. Input date
3. Input text
4. SAVE IT ALL (to a database/firebird)
5. go to menu
6. choose saved entry
7. edit it

8. save all entries and display them next to each other
*/