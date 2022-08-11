import { View } from '@ray-js/components';
import { hooks } from '@ray-js/panel-sdk';
import Strings from '@/i18n';
import React from 'react';
import Section from '@/components/section';

function PageDpState() {
  const [dpState] = hooks.useDpState();
  const panelConfig = hooks.usePanelConfig();
  console.log(panelConfig);
  return (
    <View style={{ flex: 1 }}>
      <View>
        {Object.keys(dpState).map(key => {
          return <Section key={key} title={`${Strings.getDpLang(key)}(${key}): ${dpState[key]}`} />;
        })}
      </View>
    </View>
  );
}

export default PageDpState;
