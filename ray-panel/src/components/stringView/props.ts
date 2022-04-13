export interface IStringViewProps {
  style?: React.CSSProperties;
  bg_color?: string;
  bg_singRadius?: number;
  bg_width?: number;
  bg_padding: [number, number, number, number];
  image?: string;
  image_size?: number;
  image_radius?: number;
  title_name?: string;
  title_color?: string;
  title_fontSize?: number;
  title_fontWeight?: FontWeightType;
  subTitle_name?: string;
  subTitle_color?: string;
  subTitle_fontSize?: number;
  subTitle_fontWeight?: FontWeightType;
  param_value?: string;
  param_color?: string;
  param_fontSize?: number;
  param_fontWeight?: FontWeightType;
  onConfirm?: (event: { type: 'confirm'; value: string }) => void;
  maxlen?: number;
  type?: string;
}

export const defaultStringViewProps = {
  bg_color: '#fff',
  bg_singRadius: '28rpx',
  bg_width: '720rpx',
  bg_padding: ['48rpx', '40rpx', '48rpx', '40rpx'],
  image_size: '28rpx',
  image_radius: 0,
  title_name: 'StringView',
  title_color: '#3D3D3D',
  title_fontSize: '30rpx',
  title_fontWeight: 'normal',
  subTitle_color: 'rgba(61, 61, 61, 0.5)',
  subTitle_fontSize: '28rpx',
  subTitle_fontWeight: 'normal',
  param_value: '',
  param_color: 'rgba(61, 61, 61, 0.5)',
  param_fontWeight: 'normal',
  param_fontSize: '28rpx',
};

export type FontWeightType =
  | 'normal'
  | 'bold'
  | '100'
  | '200'
  | '300'
  | '400'
  | '500'
  | '600'
  | '700'
  | '800'
  | '900'
  | undefined;

export interface IStringViewState {
  visible: boolean;
  value: string;
}
