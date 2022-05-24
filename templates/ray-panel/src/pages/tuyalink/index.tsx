import { getDevInfo } from '@/api';
import Strings from '@/i18n';
import { useSelector } from '@/redux';
import NotifyPng from '@/res/notify.png';
import { scaleNumber, transformData } from '@/utils';
import { setNavigationBarTitle } from '@ray-js/api';
import { Button, ScrollView, Text, View } from '@ray-js/components';
import _ from 'lodash';
import React from 'react';
import mode from '../../res/mode.png';
import styles from './index.module.less';

const _handlePublishDp = (params: any) => {
  console.log('下发dp， 参照下列代码');
  // publishPropertyDpData({ dp_code: dp_value })
  //   .then(() => {
  //     console.log('调用成功');
  //   })
  //   .catch(error => {
  //     console.log(error);
  //   });
};
const _handlePublishAction = (params: any) => {
  console.log('下发dp， 参照下列代码');
  // publishActionDpData({ actionCode: actionCode, inputParams: {code: 'inputCode', typeSpec: {xxx: yyy} } })
  //   .then(() => {
  //     console.log('调用成功');
  //   })
  //   .catch(error => {
  //     console.log(error);
  //   });
};
export default function TYLink() {
  const thingModel = useSelector(state => state.thingModel);
  const devInfo = useSelector(state => state.devInfo);
  const { services = [] } = thingModel;

  React.useEffect(() => {
    const { name } = getDevInfo();
    setNavigationBarTitle({ title: name });
  }, []);

  if (!services.length) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', display: 'flex' }}>
        <Text>{Strings.getLang('thing_empty')}</Text>
      </View>
    );
  }

  const data = _.flatten(
    services.map(service => {
      const { properties = [], actions = [], events = [] } = service;
      const propertiesComp = properties.map(property => {
        const {
          accessMode,
          code,
          value,
          typeSpec: {
            type,
            range,
            unit,
            min,
            max,
            scale,
            step,
            maxlen,
            label,
            properties: structureProperties,
            elementTypeSpec,
          },
          abilityId,
        } = property;

        // 故障组件
        return {
          thingModelDp: property,
          key: abilityId,
          dataSource: range,
          image: mode,
          title_name: code ?? Strings.getLang('func_name'),
          unit,
          scale,
          param_value: type === 'value' ? scaleNumber(scale, value ?? min) : value,
          min: scaleNumber(scale, min),
          max: scaleNumber(scale, max),
          step: scaleNumber(scale, step),
          type,
          maxlen,
          structureSource: transformData(
            type,
            _.omit(structureProperties, ['bitmap', 'time']),
            value
          ),
          devId: devInfo?.devId,
        };
      });
      const actionsComp = actions.map(action => {
        const { abilityId, code } = action;
        return {
          title_name: code ?? Strings.getLang('func_name'),
          image: mode,
          thingModelDp: action,
          devId: devInfo?.devId,
          key: abilityId,
        };
      });
      const eventComp = events.map(event => {
        const { abilityId, code } = event;
        return {
          title_name: code ?? Strings.getLang('func_name'),
          image: NotifyPng,
          thingModelDp: event,
          key: abilityId,
        };
      });
      return propertiesComp.concat(actionsComp, eventComp);
    })
  );

  console.log('thingModel: ', thingModel);
  console.log('showData: ', data);

  return (
    <ScrollView
      scrollY
      style={{
        backgroundColor: '#f2f4f6',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        paddingTop: '20rpx',
        paddingBottom: '40rpx',
        height: '100vh',
      }}
    >
      <Button className={styles.button} onClick={_handlePublishDp}>
        <Text>下发dp点</Text>
      </Button>

      <Button className={styles.button} onClick={_handlePublishAction}>
        <Text>下发动作</Text>
      </Button>
    </ScrollView>
  );
}
