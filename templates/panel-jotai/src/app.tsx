import React from 'react';
import 'ray';
import '@/i18n';
import { kit } from '@ray-js/panel-sdk';
import withDevicePanel from './withDevicePanel';

const { getDevInfo } = kit;
interface Props {
  children: React.ReactNode;
}

class App extends React.Component<Props> {
  componentDidMount() {
    console.log('=== App  did mount', getDevInfo());
  }

  onLaunch() {
    console.info('=== App onLaunch');
  }

  render() {
    return this.props.children;
  }
}

export default withDevicePanel(App);
