import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from './routes';
import './styles.css';

const App = () => (
  <BrowserRouter>
    <Routes />
  </BrowserRouter>
)

export default App;
