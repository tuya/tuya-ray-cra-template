/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { kit } from '@ray-js/panel-sdk';
import { actions, store } from '@/redux';

const { initDevInfo } = kit;
interface Props {
  devInfo: DevInfo;
  // eslint-disable-next-line react/require-default-props
  extraInfo?: Record<string, any>;
  // eslint-disable-next-line react/require-default-props
  preload?: boolean;
}

interface State {
  devInfo: DevInfo;
}

const composeLayout = (Comp: React.ComponentType<any>) => {
  const { dispatch } = store;
  return class PanelComponent extends Component<Props, State> {
    constructor(props) {
      super(props);
      this.state = {
        devInfo: null,
      };
    }

    async onLaunch(object: any) {
      console.log('app onLaunch: ', object);
      const devInfo = await initDevInfo();
      this.setState({ devInfo });
      if (devInfo && devInfo.devId) {
        dispatch(actions.common.devInfoChange(devInfo));
      }
    }

    onShow(object: any) {
      // console.log('app onShow: ', object);
    }

    onHide(object: any) {
      // console.log('app onHide: ', object);
    }

    onError(object: any) {
      // console.log('app onError: ', object);
    }

    onPageNotFound(object: any) {
      // console.log('app onPageNotFound: ', object);
    }

    onUnhandledRejection(object: any) {
      // console.log('app onUnhandledRejection: ', object);
    }

    onThemeChange(object: any) {
      // console.log('app onThemeChange', object);
    }

    render() {
      const { extraInfo } = this.props;
      const { devInfo } = this.state;

      return (
        <Provider store={store}>
          {devInfo && <Comp devInfo={devInfo} extraInfo={extraInfo} {...this.props} />}
        </Provider>
      );
    }
  };
};

export default composeLayout;
