import React from 'react';
import MyComponent from './MyComponent';
import './App.css';

import { StackEvents  } from 'stack-events';

function App() {
  return (
    <StackEvents events={["keydown", "mousedown"]}>
      <MyComponent index={1} />
    </StackEvents>
  );
}

export default App;
