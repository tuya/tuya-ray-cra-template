import React from 'react';
import { View } from '@ray/components';
import { ThemeUtils } from '@ray/ray-panel-utils';
import { publishPropertyDpData } from '@/api';
import { IStructureViewProps, defaultStructureProps } from './props';
import BoolView from '../boolView';
import NumberView from '../numberView';
import StringView from '../stringView';
import MenuView from '../menuView';

const { parseToStyle } = ThemeUtils;

export default function StructureView(props: IStructureViewProps): JSX.Element | null {
  const {
    bg_color,
    bg_width,
    bg_singRadius,
    bg_padding,
    style,
    structureSource,
    title_name,
  } = props;
  if (!structureSource || !structureSource.length) return null;

  const getDpPayload = () => {
    const payloadValues = Object.values(structureSource);
    const payload = {};
    payloadValues.forEach(value => {
      const { key, param_value } = value;
      payload[key] = param_value;
    });
    return payload;
  };

  const _handleClick = (event, key) => {
    const { value } = event;
    const payload = getDpPayload();
    publishPropertyDpData({ [title_name]: { ...payload, [key]: value } });
  };

  const renderItem = (item: { type: string }, index: number) => {
    switch (item.type) {
      case 'bool':
        return (
          <BoolView
            key={index}
            {...item}
            bg_color={bg_color}
            bg_width={bg_width}
            bg_singRadius={bg_singRadius}
            bg_padding={bg_padding}
            onChange={event => _handleClick(event, item.key)}
          />
        );
      case 'value':
        return (
          <NumberView
            key={index}
            {...item}
            bg_color={bg_color}
            bg_width={bg_width}
            bg_singRadius={bg_singRadius}
            bg_padding={bg_padding}
            onChange={event => _handleClick(event, item.key)}
          />
        );
      case 'string':
        return (
          <StringView
            key={index}
            {...item}
            bg_color={bg_color}
            bg_width={bg_width}
            bg_singRadius={bg_singRadius}
            bg_padding={bg_padding}
            onConfirm={event => _handleClick(event, item.key)}
          />
        );
      case 'enum':
        return (
          <MenuView
            key={index}
            {...item}
            bg_color={bg_color}
            bg_width={bg_width}
            bg_singRadius={bg_singRadius}
            bg_padding={bg_padding}
            onChange={event => _handleClick(event, item.key)}
          />
        );
      case 'raw':
        return (
          <StringView
            key={index}
            {...item}
            bg_color={bg_color}
            bg_width={bg_width}
            bg_singRadius={bg_singRadius}
            bg_padding={bg_padding}
            onConfirm={event => _handleClick(event, item.key)}
          />
        );
      default:
        return null;
    }
  };
  return (
    <View
      style={{
        backgroundColor: bg_color,
        width: bg_width,
        borderRadius: bg_singRadius,
        ...parseToStyle(bg_padding, 'bg_padding'),
        ...style,
      }}
    >
      {structureSource.map((item, index) => {
        return renderItem(item, index);
      })}
    </View>
  );
}

StructureView.defaultProps = defaultStructureProps;
