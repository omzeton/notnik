import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions';
import NoteBody from '../../components/MainBody/NoteBody/NoteBody';
import NoteHead from '../../components/MainBody/NoteHead/NoteHead';

import './NoteBuilder.css';

class NoteBuilder extends Component {

  state = {
    id: null
  }

  getRandomId() {
    let id = Math.floor( Math.random() * 1000000 );
    this.props.onSetIndex(id);
    return id;
  }


  render() {
    let date = new Date(),
        year = date.getFullYear(),
        month = date.getMonth() + 1,
        day = date.getDate(),
        hour = date.getHours(),
        header = "title",
        id = this.getRandomId(),
        text = "Tell me about it...",
        img = "test.png";
    hour += ":";
    hour += date.getMinutes();

    // if (month < 9) {
    //   month.unshift("0");
    // }

    return (
      <div className="NoteBuilder">
          <NoteHead header={header}
                    year={year}
                    month={month}
                    day={day}
                    hour={hour}
                    id={id}
                    img={img}/>
          <NoteBody text={text}/>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSetIndex: (index) => dispatch(actionCreators.setIndex(index))
  };
};

export default connect(null, mapDispatchToProps)(NoteBuilder);