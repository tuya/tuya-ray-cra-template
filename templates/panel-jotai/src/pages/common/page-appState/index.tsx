import React from 'react';
import { useAtomValue } from 'jotai';
import { View } from '@ray-js/components';
import { hooks } from '@ray-js/panel-sdk';
import Section from '@/components/section';

const { useBluetooth, useNetwork } = hooks;
function PageAppState() {
  const network = useNetwork();
  const bluetooth = useBluetooth();
  return (
    <View style={{ flex: 1 }}>
      {Object.keys(network).map(key => {
        return <Section key={key} title={`network.${key}: ${network[key]}`} />;
      })}
      {Object.keys(bluetooth).map(key => {
        return <Section key={key} title={`bluetooth.${key}: ${bluetooth[key]}`} />;
      })}
    </View>
  );
}

export default PageAppState;
