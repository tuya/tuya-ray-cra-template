import { IBoolViewProps } from '../boolView/props';
import { INumberViewProps } from '../numberView/props';
import { IStringViewProps } from '../stringView/props';
import { IMenuViewProps } from '../menuView/props';

export interface IStructureViewProps {
  bg_color?: string;
  bg_width?: string;
  bg_singRadius?: string;
  bg_padding?: string[];
  style?: React.CSSProperties;
  structureSource: (IMenuViewProps | IStringViewProps | INumberViewProps | IBoolViewProps) &
    { type: string }[];
}

export const defaultStructureProps = {
  bg_color: '#fff',
  bg_width: '720rpx',
  bg_singRadius: '28rpx',
  bg_padding: ['32rpx', '40rpx', '36rpx', '40rpx'],
};
