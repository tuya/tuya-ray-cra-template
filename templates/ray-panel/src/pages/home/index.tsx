import React from 'react';
import _ from 'lodash';

import { CompList } from '@/components';
import { useSelector } from '@/redux';
import { scaleNumber, transformData } from '@/utils';
import NotifyPng from '@/res/notify.png';
import { getDevInfo } from '@/api';
import { View, ScrollView, Modal, Motion, Text } from '@ray-js/components';
import Strings from '@/i18n';
import { setNavigationBarTitle } from '@ray-js/api';
import { Notification } from '@ray-js/ray-components-plus';

import mode from '../../res/mode.png';

export default function Home() {
  const thingModel = useSelector(state => state.thingModel);
  const devInfo = useSelector(state => state.devInfo);
  // 最多显示 4 个故障弹框
  const [show, setShow] = React.useState([true, true, true, true]);
  const { services = [] } = thingModel;

  React.useEffect(() => {
    const { name } = getDevInfo();
    setNavigationBarTitle({ title: name });
  }, []);

  const renderItem = ({ value, label }) => {
    const labelValueArr = parseInt(value ?? 0, 10)
      .toString(2)
      .split('');
    if (label && label.length > 0) {
      return label.map((item, idx) => {
        if (labelValueArr[idx] === '1') {
          return (
            <Modal position="top" overlay={false} show={show[idx]}>
              <Motion.PushDown
                show={show[idx]}
                style={{
                  position: 'absolute',
                  top: `${(idx + 1) * 20 + idx * 30}px`,
                }}
              >
                <Notification
                  icon="warning"
                  onClose={() => {
                    const newShow = [...show];
                    newShow[idx] = false;
                    setShow(newShow);
                  }}
                >
                  {item}
                </Notification>
              </Motion.PushDown>
            </Modal>
          );
        }
        return null;
      });
    }
    return null;
  };

  if (!services.length) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', display: 'flex' }}>
        <Text>{Strings.getLang('thing_empty')}</Text>
      </View>
    );
  }

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
      {_.flatten(
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
            const element = _.get(
              CompList,
              `prop.${accessMode === 'ro' ? accessMode : 'rwOrWr'}.${type}`
            );

            // 故障组件

            if (type === 'bitmap') {
              return renderItem({ value, label });
            }

            if (
              !element ||
              (type === 'enum' && !range) ||
              (type === 'array' &&
                (elementTypeSpec?.type === 'bitmap' ||
                  elementTypeSpec?.type === 'date' ||
                  elementTypeSpec?.type === 'enum')) ||
              (type === 'struct' &&
                (elementTypeSpec?.type === 'bitmap' || elementTypeSpec?.type === 'date'))
            ) {
              return null;
            }

            return (
              <View
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: '20rpx',
                }}
              >
                {React.createElement(element, {
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
                })}
              </View>
            );
          });
          const actionsComp = actions.map(action => {
            const { abilityId, code } = action;
            const element = CompList?.action;
            if (!element) {
              return null;
            }
            return (
              <View
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: '20rpx',
                }}
              >
                {React.createElement(element, {
                  title_name: code ?? Strings.getLang('func_name'),
                  image: mode,
                  thingModelDp: action,
                  devId: devInfo?.devId,
                  key: abilityId,
                })}
              </View>
            );
          });
          const eventComp = events.map(event => {
            const { abilityId, code } = event;
            const element = CompList?.event;
            if (!element) {
              return null;
            }
            return React.createElement(element, {
              title_name: code ?? Strings.getLang('func_name'),
              image: NotifyPng,
              thingModelDp: event,
              key: abilityId,
            });
          });
          return propertiesComp.concat(actionsComp, eventComp);
        })
      )}
    </ScrollView>
  );
}
