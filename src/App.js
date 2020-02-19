import React, { useReducer, useState, useRef } from 'react';
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

  // model local state, default null
  const [model,setModel] = useState(null);

  // image url local state, default null
  const [imageUrl,setImageUrl] = useState(null);

  // image input ref
  const inputRef = useRef();

  // load image classifier model
  const loadModel = async () => {
    // trigger state transition from initial to loadingModel state
    next();
    // load model
    const mobilenetModel = await mobilenet.load();
    // set model to state
    setModel(mobilenetModel);
    // trigger state transition from loadingModel state to awaitingUpload state
    next();
  }

  // handle image upload
  const handleImageUpload = e => {
    const { files } = e.target;
    
    if (files.length > 0) {
      // take the first file and get it's url
      const url = URL.createObjectURL(files[0]);
      setImageUrl(url);
      // transition from awaitingupload state to ready state
      next()
    }
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
      <input
        type="file"
        accept="image/*"
        capture="camera"
        ref={inputRef}
        onChange={handleImageUpload}
      />
      <button onClick={buttonProps[state].action}>
        {buttonProps[state].text}
      </button>
    </div>
  );
}

export default App;
