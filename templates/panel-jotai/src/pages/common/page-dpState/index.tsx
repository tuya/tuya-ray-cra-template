import React from 'react';
import { useAtomValue } from 'jotai';
import { View } from '@ray-js/components';
import { Strings } from '@ray-js/ray-panel-i18n';
import { selectDpStateAtom } from '@/atoms';
import Section from '@/components/section';

function PageDpState() {
  const dpState = useAtomValue(selectDpStateAtom);
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
