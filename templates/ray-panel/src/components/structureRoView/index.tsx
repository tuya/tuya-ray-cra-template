import React from 'react';
import { View } from '@ray-js/components';
import { ThemeUtils } from '@ray-js/ray-panel-utils';
import { IStructureViewProps, defaultStructureProps } from './props';
import ShowText from '../showText';

const { parseToStyle } = ThemeUtils;

export default function StructureView(props: IStructureViewProps): JSX.Element | null {
  const { bg_color, bg_width, bg_singRadius, bg_padding, style, structureSource } = props;
  if (!structureSource || !structureSource.length) return null;
  const renderItem = (item: { type: string }, index: number) => {
    switch (item.type) {
      case 'bool':
        return (
          <ShowText
            key={index}
            {...item}
            value={item.param_value}
            background_color={bg_color}
            width={bg_width}
            border_radius={[bg_singRadius, bg_singRadius, bg_singRadius, bg_singRadius]}
            padding={bg_padding}
          />
        );
      case 'value':
        return (
          <ShowText
            key={index}
            {...item}
            value={`${item.param_value}${item.unit}`}
            background_color={bg_color}
            width={bg_width}
            border_radius={[bg_singRadius, bg_singRadius, bg_singRadius, bg_singRadius]}
            padding={bg_padding}
          />
        );

      case 'enum':
        return (
          <ShowText
            key={index}
            {...item}
            value={item.param_value}
            background_color={bg_color}
            width={bg_width}
            border_radius={[bg_singRadius, bg_singRadius, bg_singRadius, bg_singRadius]}
            padding={bg_padding}
          />
        );
      default:
        return (
          <ShowText
            key={index}
            {...item}
            value={item.param_value}
            background_color={bg_color}
            width={bg_width}
            border_radius={[bg_singRadius, bg_singRadius, bg_singRadius, bg_singRadius]}
            padding={bg_padding}
          />
        );
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
