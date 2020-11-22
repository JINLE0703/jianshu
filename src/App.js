import React, { Component } from 'react';
import Header from './common/header/index';
import { Globalstyle } from './style.js';
import { IconFontStyle } from './statics/iconfont/iconfont';
import store from './store/index';
import { Provider } from 'react-redux';


class App extends Component {
  render() {
    return (
      <>
        <Globalstyle />
        <IconFontStyle />
        <Provider store={store}>
          <Header></Header>
          <div>
            hello world
        </div>
        </Provider>
      </>
    )
  }
}

export default App;