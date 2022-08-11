import { View } from '@ray-js/components';
import { hooks } from '@ray-js/panel-sdk';
import React from 'react';
import Section from '@/components/section';

const { useNetwork, useBluetooth } = hooks;

function PageAppState() {
  const network = useNetwork();
  const bluetooth = useBluetooth();
  console.log('bluetooth', bluetooth);
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
