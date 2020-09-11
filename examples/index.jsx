import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Examples from './Examples';

export const USE_AUTHORIZATION = false;

ReactDOM.render(
  <Examples useAuthorization={USE_AUTHORIZATION} />,
  document.getElementById('root')
);
