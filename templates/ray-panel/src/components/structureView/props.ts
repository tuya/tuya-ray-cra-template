import { IBoolViewProps } from '../boolView/props';
import { INumberViewProps } from '../numberView/props';
import { IStringViewProps } from '../stringView/props';
import { IMenuViewProps } from '../menuView/props';

export interface IStructureViewProps {
  bg_color?: string;
  bg_width?: number;
  bg_singRadius?: number;
  bg_padding?: [number, number, number, number];
  style?: React.CSSProperties;
  title_name?: string;
  structureSource: (IMenuViewProps | IStringViewProps | INumberViewProps | IBoolViewProps) &
    { type: string; key: string }[];
}

export const defaultStructureProps = {
  bg_color: '#fff',
  bg_width: '720rpx',
  bg_singRadius: '28rpx',
  bg_padding: ['48rpx', '40rpx', '48rpx', '40rpx'],
};
