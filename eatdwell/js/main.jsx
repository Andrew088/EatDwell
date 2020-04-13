import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import '../static/css/style.css';

// icons
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSnowflake} from "@fortawesome/free-solid-svg-icons"; //snowflake icon
import { faTimes} from "@fortawesome/free-solid-svg-icons"; // x out icon

library.add(faSnowflake, faTimes) //adds to library to use wherever
// use like this: <FontAwesomeIcon icon="check-square" />



ReactDOM.render(
  <App />,
  document.getElementById('reactEntry'),
);
