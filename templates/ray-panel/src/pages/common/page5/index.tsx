import React from 'react';
import { View, Image, Text } from '@ray-js/components';
import { useSelector } from '@/redux';

function Page5() {
  const staticPrefix = useSelector(state => state.staticPrefix);
  const uri = `${staticPrefix}/smart/ui/00000002n0/1591948544857.PNG`;
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ color: '#000' }}>{`当前资源地址: ${staticPrefix}`} </Text>
      <Image style={{ width: 200, height: 200 }} src={uri} />
    </View>
  );
}

export default Page5;
