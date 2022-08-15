import React from 'react';
import { View, Text } from '@ray-js/components';
import { hooks } from '@ray-js/panel-sdk';
import Strings from '@/i18n';
import { useSelector } from '@/redux';

const { useDpState } = hooks;

function Page10() {
  const devInfo = useSelector(state => state.devInfo);
  // const dpState = useSelector(state => state.dpState);
  const [dpState] = useDpState();
  console.log(devInfo, dpState);

  return (
    <View style={{ flex: 1 }}>
      <Text>dp点及状态</Text>
      <View>
        {Object.keys(dpState).map(key => {
          return (
            <View
              key={key}
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                display: 'flex',
                paddingLeft: '30rpx',
                paddingRight: '30rpx',
              }}
            >
              <Text style={{ flex: 1 }}>{Strings.getDpLang(key)}: </Text>
              <Text>{String(dpState[key])}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}

export default Page10;
