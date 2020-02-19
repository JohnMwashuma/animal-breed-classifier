import React, { useReducer, useState, useRef } from 'react';
import * as mobilenet from "@tensorflow-models/mobilenet";
import './App.css';

const stateMachine = {
  initial: 'initial',
  states: {
    initial: { on: { next: 'loadingModel' } },
    loadingModel: { on: { next: 'awaitingUpload' } },
    awaitingUpload: { on: { next: 'ready' } },
    ready: { on: { next: 'classifying' }, showImage: true },
    classifying: { on: { next: 'complete' } },
    complete: { on: { next: 'awaitingUpload' },
                showImage: true,
                showPredictions: true }
  }
}

const formatPredictions = ({ className, probability }) => (
  // Mutiply probality by 100 and fix it to 2 decimal places
  <li key={className}>
    {`${className}: %${(probability * 100).toFixed(2)}`}
  </li>
)

const reducer = (currentState, event) => stateMachine.states[currentState].on[event] || stateMachine.initial;

function App() {
  // App state reducer
  const [state, dispatch] = useReducer(reducer, stateMachine.initial);

  // Dispatch function
  const next = () => dispatch('next');

  // Model local state, default null
  const [model,setModel] = useState(null);

  // Image url local state, default null
  const [imageUrl,setImageUrl] = useState(null);

  // Predictions local state, default empty array
  const [predictions,setPredictions] = useState([]);

  // File input ref
  const inputRef = useRef();

  // Image element ref
  const imageRef = useRef();

  // Load image classifier model
  const loadModel = async () => {
    // Trigger state transition from initial to loadingModel state
    next();
    // Load model
    const mobilenetModel = await mobilenet.load();
    // Set model to state
    setModel(mobilenetModel);
    // Trigger state transition from loadingModel state to awaitingUpload state
    next();
  }

  // Handle image upload
  const handleImageUpload = e => {
    const { files } = e.target;
    
    if (files.length > 0) {
      // Take the first file and get it's url
      const url = URL.createObjectURL(files[0]);
      setImageUrl(url);
      // Trigger state transition from awaitingupload state to ready state
      next()
    }
  }

  const idetifyImage = async () => {
    // Trigger state transition from ready state to classifying state
    next()
    // Classify the image.
    const classificationResults = await model.classify(imageRef.current);
    setPredictions(classificationResults);
    // Trigger state transition from classifying state to complete state
    next()
  }

  const reset = () => {
    setPredictions([]);
    setImageUrl(null);
    // Trigger state transition from complete state to awaitingUpload state
    next()
  }

  const buttonProps = {
    initial: { text: 'Load Model', action: loadModel },
    loadingModel: { text: 'Loading Model...', action: () => { }  },
    awaitingUpload: { text: 'Upload Photo', action: () => inputRef.current.click()  },
    ready: { text: 'Identify', action: idetifyImage  },
    classifying: { text: 'Identifying...', action: () => { }  },
    complete: { text: 'Reset', action: reset  }
  }

  const { showImage = false, showPredictions = false } = stateMachine.states[state];

  return (
    <div>
      {showImage && <img alt="upload-preview" src={imageUrl} ref={imageRef} />}
      {showPredictions && <ul>{predictions.map(formatPredictions)}</ul>}
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
