import React, { Component } from 'react';

import UserViewer from './UserViewer';

class App extends Component {
  selectRow = (user) => { 
    console.log(user);
  }
  render() {
    return (
      <main>
        <UserViewer selectRow={this.selectRow}/>
      </main>
    );
  }
}

export default App;