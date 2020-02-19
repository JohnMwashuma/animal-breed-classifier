import React, { useReducer, useState } from 'react';
import * as mobilenet from "@tensorflow-models/mobilenet";
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
  // app state reducer
  const [state, dispatch] = useReducer(reducer, stateMachine.initial);

  // dispatch function
  const next = () => dispatch('next');

  // model local state, default value is null
  const [model,setModel] = useState(null);

  // load image classifier model
  const loadModel = async () => {
    // trigger state transition from initial to loadingModel
    next();
    // load model
    const mobilenetModel = await mobilenet.load();
    // set model to state
    setModel(mobilenetModel);
    // trigger state transition from loadingModel to awaitingUpload
    next();
  }

  const buttonProps = {
    initial: { text: 'Load Model', action: loadModel },
    loadingModel: { text: 'Loading Model...', action: () => { }  },
    awaitingUpload: { text: 'Upload Photo', action: () => { }  },
    ready: { text: 'Identify', action: () => { }  },
    classifying: { text: 'Identifying...', action: () => { }  },
    complete: { text: 'Reset', action: () => { }  }
  }

  return (
    <div>
      <button onClick={buttonProps[state].action}>{buttonProps[state].text}</button>
    </div>
  );
}

export default App;
