import React from 'react';
import 'ray';
import '@/i18n';

import composeLayout from './composeLayout';

class App extends React.Component {
  componentDidMount() {
    console.info('app did mount ');
  }

  render() {
    return this.props.children;
  }
}

export default composeLayout(App);
