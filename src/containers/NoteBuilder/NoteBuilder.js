import React, { Component } from 'react';
import NoteBody from '../../components/MainBody/NoteBody/NoteBody';
import NoteHead from '../../components/MainBody/NoteHead/NoteHead';

import './NoteBuilder.css';

class NoteBuilder extends Component {

  state = {
    header: 'Title',
    year: '-',
    month: '-',
    day: '-',
    hour: '-',
    id: 'randomId',
    img: 'notreally.png',
    text: 'start writing!'
  }
  // Get current date!

  render() {
    let date = new Date();
    console.log(`Day: ${date.getDate()}`);
    console.log(`Month: ${date.getMonth() + 1}`);
    console.log(`Year: ${date.getFullYear()}`);
    console.log(`Hour: ${date.getHours()}:${date.getMinutes()}`);
    return (
      <div className="NoteBuilder">
          <NoteHead header={this.state.header}
                    year={this.state.year}
                    month={this.state.month}
                    day={this.state.day}
                    hour={this.state.hour}
                    id={this.state.id}
                    img={this.state.img}/>
          <NoteBody text={this.state.text}/>
      </div>
    );
  }
}

export default NoteBuilder;