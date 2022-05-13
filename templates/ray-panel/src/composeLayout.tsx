/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Text } from '@ray-js/components';
import _ from 'lodash';
import { detailedDiff } from 'deep-object-diff';
import React, { Component } from 'react';
import { connect, Provider } from 'react-redux';
import Strings from '@/i18n';
import { ReduxState } from '@/redux/store';
import { actions, store } from '@/redux';
import defaultUiConfig from '@/config/panelConfig/iot';
import { Connect } from '@/components';
import { getOssUrl, getUiIdI18N, getDeviceThingDataSource, initDevInfo } from '@/api';
import { Theme } from '@ray-js/ray-panel-theme';
import { JsonUtils } from '@ray-js/ray-panel-utils';
import { CloudConfig, Config, withConfig } from '@ray-js/ray-panel-standard-hoc';
import { thingDpType } from '@/constant';

const { parseJSON } = JsonUtils;

interface Props {
  devInfo: DevInfo;
  // eslint-disable-next-line react/require-default-props
  extraInfo?: Record<string, any>;
  // eslint-disable-next-line react/require-default-props
  preload?: boolean;
}

interface State {
  isI18NLoaded: boolean;
}

interface ConnectedProps extends ReduxState {
  mapStateToProps: any;
}

const composeLayout = (Comp: React.ComponentType<any>) => {
  const ThemeContainer = connect((props: ReduxState) => ({ theme: props.theme }))(Theme);
  const { dispatch } = store;

  const onInit = (devInfo: DevInfo) => {
    try {
      getOssUrl().then(staticPrefix => dispatch(actions.common.initStaticPrefix(staticPrefix)));
      // @ts-expect-error
      dispatch(actions.common.updateMiscConfig({ hasSwitch: !!devInfo.schema.switch }));
    } catch (error) {
      console.warn('onApplyConfig Failed :>> ', error);
    }
  };

  const onApplyConfig = async (config: Config, devInfo: DevInfo, source: string) => {
    try {
      dispatch(actions.common.initIoTConfig(config.iot));
      const bicConfigMap: CloudConfig = _.get(devInfo, 'panelConfig.bic', []).reduce(
        (acc: CloudConfig, cur: CloudConfig['jump_url'] | CloudConfig['timer']) => ({
          ...acc,
          [cur!.code]: cur,
        }),
        {}
      );
      const showSchedule = !!bicConfigMap?.timer?.selected;
      dispatch(actions.common.initBicConfig(bicConfigMap));
      const { timestamp, ...dpFun } = config.dpFun || {};
      const funConfig = _.mapValues(dpFun, value => parseJSON(value));
      dispatch(actions.common.initFunConfig({ ...funConfig, raw: config.dpFun }));
      dispatch(actions.common.updateMiscConfig({ ...config.misc, showSchedule }));
      dispatch(actions.common.initializedConfig());
    } catch (error) {
      console.warn('onApplyConfig Failed :>> ', error);
    }
  };

  const NavigatorLayout: React.FC<Props> = p => {
    return (
      <Connect mapStateToProps={_.identity}>
        {({ mapStateToProps, ...props }: ConnectedProps) => {
          const { panelConfig } = props;
          if (Object.keys(props.devInfo.dps).length === 0) {
            return <Text>{Strings.getLang('hang')}</Text>;
          }
          const hasInit = panelConfig.initialized;
          return hasInit ? <Comp {...p} {...props} /> : null;
        }}
      </Connect>
    );
  };

  const NavigatorLayoutContainer = withConfig({
    onInit,
    onApplyConfig,
    defaultUiConfig,
  })(NavigatorLayout);

  ty.device.onDeviceInfoUpdated(data => {
    dispatch(actions.common.deviceChange(data));
  });

  ty.device.onDpDataChange(date => {
    dispatch(actions.common.responseUpdateDp(data as any));
  });

  // 监听物模型消息推送
  ty.device.onReceivedThingModelMessage(body => {
    // @ts-expect-error
    console.log('OnReceivedThingModelMessageBody 调用成功', JSON.parse(body));
    const message = typeof body === 'string' ? JSON.parse(body) : body;
    // 事件弹窗
    if (message?.type === thingDpType.event) {
      dispatch(actions.common.toggleShowModel({ code: message?.payload?.eventCode, value: true }));
    }
    // 动作弹窗
    if (message?.type === thingDpType.action) {
      dispatch(actions.common.toggleShowModel({ code: message?.payload?.actionCode, value: true }));
    }
    // 属性
    dispatch(actions.common.updateThingModel(message));
  });

  const initThingModel = devId => {
    getDeviceThingDataSource().then(data => {
      dispatch(actions.common.initThingModel(data));
    });
    // 订阅接受物模型推送消息
    ty.device.subscribeReceivedThingModelMessage({
      devId,
      success: () => console.log('subscribeReceivedThingModelMessage 调用成功'),
      fail: () => console.log('subscribeReceivedThingModelMessage 调用失败'),
    });
    // 订阅设备移除事件
    ty.device.subscribeDeviceRemoved({
      deviceId: devId,
      success: () => {
        console.log('subscribeDeviceRemoved 调用成功');
        // 监听删除设备事件
        ty.device.onDeviceRemoved(body => {
          console.log('OnDeviceRemoved 调用成功', body);
          // 退出小程序容器
          ty.exitMiniProgram({});
        });
      },
      fail: () => console.log('subscribeDeviceRemoved 调用失败'),
    });
  };

  return class PanelComponent extends Component<Props, State> {
    constructor(props: Props) {
      super(props);
      this.state = {
        isI18NLoaded: false,
      };
    }

    async onLaunch(object: any) {
      await initDevInfo();
      this.init();
      console.log('app onLaunch: ', object);
    }

    onShow(object: any) {
      console.log('app onShow: ', object);
    }

    onHide(object: any) {
      console.log('app onHide: ', object);
    }

    onError(object: any) {
      console.log('app onError: ', object);
    }

    onPageNotFound(object: any) {
      console.log('app onPageNotFound: ', object);
    }

    onUnhandledRejection(object: any) {
      console.log('app onUnhandledRejection: ', object);
    }

    onThemeChange(object: any) {
      console.log('app onThemeChange', object);
    }

    init() {
      /**
       * 如果当前 ui 和 uiId 对应不上，则说明当前运行的为二级页面，
       * 因此需要针对二级页面单独拉取其 uiId 并合并至当前项目多语言中
       */
      const { props } = this;
      const ui = props?.devInfo?.ui?.split('_')[0];
      const isSubUiId = ui !== props?.devInfo?.uiId;
      const isI18NLoaded = !isSubUiId;
      this.setState({ isI18NLoaded });

      if (props && props.devInfo && props.devInfo.devId) {
        dispatch(actions.common.devInfoChange(props.devInfo));
        initThingModel(props.devInfo.devId);
      }

      if (isI18NLoaded) {
        return;
      }
      this.applySubUiIDAddedI18N();
    }

    /**
     * 比对当前 pid 多语言和当前使用的二级页面的 uiId 多语言，
     * 将二级页面 uiId 多语言多出的字段合并进去，
     * 将和 pid 多语言有冲突多语言字段给予警告提示
     */
    applySubUiIDAddedI18N() {
      const { devInfo } = this.props;
      console.warn('检测到当前项目为二级页面开始获取当前项目 UIID 多语言');
      getUiIdI18N(devInfo.uiId).then(data => {
        console.log('多语言获取成功：', data);

        ty.getLangContent({
          success: ({ langContent }) => {
            // @ts-ignore
            const { langKey, ...rest } = langContent || {};
            const diff = detailedDiff(rest, data) as {
              added: Record<string, unknown>;
              updated: Record<string, unknown>;
              deleted: Record<string, unknown>;
            };
            Strings.applyStrings(diff.added);
            console.warn(
              '当前二级页面 uiId 多语言有以下字段与 pid 多语言冲突，请注意!',
              diff.updated
            );
            this.setState({ isI18NLoaded: true });
          },
        });
      });
    }

    render() {
      const { devInfo, extraInfo } = this.props;
      const { isI18NLoaded } = this.state;
      console.log('isI18NLoaded', isI18NLoaded);

      return (
        <Provider store={store}>
          <ThemeContainer>
            {isI18NLoaded && (
              <NavigatorLayoutContainer devInfo={devInfo} extraInfo={extraInfo} {...this.props} />
            )}
          </ThemeContainer>
        </Provider>
      );
    }
  };
};

export default composeLayout;
