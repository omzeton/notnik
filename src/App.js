import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Notnik from './components/Notnik/Notnik';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Notnik />
      </BrowserRouter>
    </div>
  );
}

export default App;