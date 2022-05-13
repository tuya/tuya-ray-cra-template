import React from 'react';
// eslint-disable-next-line import/no-unresolved
import 'ray';
import '@/i18n';
import { RayAppWrapper } from '@ray-js/ray-panel-wrapper';

import composeLayout from './composeLayout';

class App extends React.Component {
  componentDidMount() {
    console.info('app did mount ');
  }

  render() {
    return this.props.children;
  }
}

export default RayAppWrapper(composeLayout(App));
