import React, { Component } from 'react';
import Entry from '../../components/Entry/Entry';

import './List.css';

class List extends Component {
  render() {
    return (
      <div className="List">
          <Entry />
      </div>
    );
  }
}

export default List;