import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions';
import NoteBody from '../../components/MainBody/NoteBody/NoteBody';
import NoteHead from '../../components/MainBody/NoteHead/NoteHead';

import './NoteBuilder.css';

class NoteBuilder extends Component {

  componentDidMount() {
      this.props.onFetchSamples();
  }

  render() {

    let data = null,
      test = '';

    if ( this.props.import ) {
        const mask = this.props.import;

        data = Object.keys(mask).map(function(key) {
            return mask[key];
        });

        test = data[0].header;

        console.log(data[0]);
    }

    return (
      <div className="NoteBuilder">
          <NoteHead header={test}/>
          <NoteBody />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
      import: state.import
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchSamples: () => dispatch(actionCreators.fetchSamples())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NoteBuilder);