import React from 'react';
import './App.css';

const stateMachine = {
  initial: { on: { next: 'loadingModel' } },
  loadingModel: { on: { next: 'awaitingUpload' } },
  awaitingUpload: { on: { next: 'ready' } },
  ready: { on: { next: 'classifying' } },
  classifying: { on: { next: 'complete' } },
  complete: { on: { next: 'awaitingUpload' } },
}

function App() {
  return (
    <div>
    </div>
  );
}

export default App;
