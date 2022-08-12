import React from 'react';
import { kit } from '@ray-js/panel-sdk';
import 'ray';
import '@/i18n';
import composeLayout from './composeLayout';

const { initPanelEnvironment } = kit;

initPanelEnvironment({ useDefaultOffline: true });
class App extends React.Component {
  componentDidMount() {
    console.info('app did mount ');
  }

  render() {
    return this.props.children;
  }
}

export default composeLayout(App);
