import React, { useReducer } from 'react';
import './App.css';

const stateMachine = {
  initial: 'initial',
  states: {
    initial: { on: { next: 'loadingModel' } },
    loadingModel: { on: { next: 'awaitingUpload' } },
    awaitingUpload: { on: { next: 'ready' } },
    ready: { on: { next: 'classifying' } },
    classifying: { on: { next: 'complete' } },
    complete: { on: { next: 'awaitingUpload' } }
  }
}

const reducer = (currentState, event) => stateMachine.states[currentState].on[event] || stateMachine.initial;

function App() {
  const [state, dispatch] = useReducer(reducer, stateMachine.initial);
  return (
    <div>
      <button onClick={() => dispatch('next')}>{state}</button>
    </div>
  );
}

export default App;
