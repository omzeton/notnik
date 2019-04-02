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
        minute = date.getMinutes(),
        header = "...",
        id = this.getRandomId(),
        text = "Tell me about it...",
        img = "no-img"; // could be some dummy background image!
    // Add 0 if hour is less than 9
    if ( hour < 9 ) {
      hour = '0' + hour;
    }
    // Separator
    hour += ":";
    // Add 0 if minute is less than 9
    if ( minute < 9 ) {
      minute = '0' + minute;
    }
    // Combine hour, separator and minutes to one string
    hour += minute;

    year = year.toString();
    month = month.toString();
    day = day.toString();
    hour = hour.toString();
    header = header.toString();
    id = id.toString();

    // Add 0 if day is less than 9
    if ( day < 9 ) {
      day = '0' + day;
    }
    // Add 0 if month is less than 9
    if (month < 9) {
      month = '0' + month;
    }


    return (
      <div className="NoteBuilder">
        <div>
          <NoteHead header={header}
                    year={year}
                    month={month}
                    day={day}
                    hour={hour}
                    id={id}
                    firebaseKey={"to-be-assigned"}
                    img={img}/>
          <NoteBody text={text}/>
        </div>
          
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