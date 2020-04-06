import React from 'react';
import ReactDOM from 'react-dom';
import RandomWidget from './RandomWidget';

ReactDOM.render(
  <App url="/api/v1/random/" />,
  document.getElementById('randomWidgetEntry'),
);
