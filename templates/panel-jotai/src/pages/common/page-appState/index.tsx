import React from 'react';
import { useAtomValue } from 'jotai';
import { View } from '@ray-js/components';
import { selectAppStateAtom } from '@/atoms';
import Section from '@/components/section';

function PageAppState() {
  const appState = useAtomValue(selectAppStateAtom);
  return (
    <View style={{ flex: 1 }}>
      {Object.keys(appState.network).map(key => {
        return <Section key={key} title={`network.${key}: ${appState.network[key]}`} />;
      })}
      {Object.keys(appState.bluetooth).map(key => {
        return <Section key={key} title={`bluetooth.${key}: ${appState.bluetooth[key]}`} />;
      })}
    </View>
  );
}

export default PageAppState;
