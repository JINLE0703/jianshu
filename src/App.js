import React, { Component, Fragment } from 'react';
import { Globalstyle } from './style.js';

class App extends Component {
  render() {
    return (
      <Fragment>
        <Globalstyle></Globalstyle>
        <div>
          hello world
        </div>
      </Fragment>
    )
  }
}

export default App;