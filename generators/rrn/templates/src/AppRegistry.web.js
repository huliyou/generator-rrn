import React from 'react';
import { render } from 'react-dom';
import IsomorphicComponent from './components/isomorphic/index.js';

const rootElement = document.getElementById('app');

export default function AppRegistry() {
  render(
    <IsomorphicComponent />,
    rootElement
  );
}
