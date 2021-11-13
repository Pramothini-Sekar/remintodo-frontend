import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";
<script src="https://cdnjs.cloudflare.com/ajax/libs/intro.js/4.3.0/intro.min.js" integrity="sha512-WYNEDpX7FCz0ejmdUFl444n+v7gDgDFYmxy2YBx99v15UUk3zU5ZWYFBXFCvWYvd+nv/guwUnXmrecK7Ee0Wtg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
