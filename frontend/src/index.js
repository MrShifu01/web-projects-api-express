import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from "./store/store"

// Create a root using ReactDOM.createRoot and target the 'root' element in the HTML
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the App component wrapped in a Provider component to provide the Redux store
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

// Call reportWebVitals to measure and report web performance metrics

reportWebVitals();
