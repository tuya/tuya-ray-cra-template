import React from 'react';
import { View, Text } from '@ray-js/components';
import { Strings } from '@ray-js/ray-panel-i18n';
import { useSelector } from '@/redux';

function Page10() {
  const devInfo = useSelector(state => state.devInfo);
  const dpState = useSelector(state => state.dpState);

  return (
    <View style={{ flex: 1 }}>
      <Text>dp点及状态</Text>
      <View>
        {Object.keys(dpState).map(key => {
          return (
            <View key={key} style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text>{Strings.getDpLang(key)}: </Text>
              <Text>{dpState[key]}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}

export default Page10;
