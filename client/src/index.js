import React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import MUITheme from './MUITheme';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'fontsource-roboto';

// See: https://stackoverflow.com/questions/61706431/react-useeffect-is-being-calling-twice
ReactDOM.render(
  <ThemeProvider theme={MUITheme}>
    <CssBaseline />
    <App />
  </ThemeProvider>,
  document.querySelector('#root'),
);

// unregister() <> register() to toggle Service Workers
serviceWorker.unregister();