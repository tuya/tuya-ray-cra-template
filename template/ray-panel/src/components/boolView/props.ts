export interface IBoolViewProps {
  image?: string;
  param_value?: boolean;
  image_size?: number;
  image_radius?: number;
  bg_color?: string;
  bg_singRadius?: number;
  bg_width?: number;
  bg_padding?: [number, number, number, number];
  title_name?: string;
  title_color?: string;
  title_fontSize?: number;
  title_fontWeight?: FontWeightType;
  subTitle_name?: string;
  subTitle_color?: string;
  subTitle_fontSize?: number;
  subTitle_fontWeight?: FontWeightType;
  switch_thumb_color_off?: string;
  switch_bg_color_on: string;
  switch_bg_color_off: string;
  style?: React.CSSProperties;
  onChange?: (event: { type: 'change'; value: boolean }) => void;
}

export const defaultBoolViewProps = {
  title_name: 'BoolView',
  title_fontSize: '30rpx',
  title_fontWeight: 'normal',
  title_color: '#3D3D3D',
  subTitle_fontSize: '28rpx',
  subTitle_color: 'rgba(61, 61, 61, 0.5)',
  subTitle_fontWeight: 'normal',
  image_size: '28rpx',
  image_radius: 0,
  bg_color: '#fff',
  bg_singRadius: '28rpx',
  bg_width: '720rpx',
  bg_padding: ['48rpx', '40rpx', '48rpx', '40rpx'],
  param_value: true,
  switch_thumb_color_off: '#FFF',
  switch_bg_color_off: 'rgba(0,0,0,0.12)',
  switch_bg_color_on: '#158CFC',
};

export interface IBoolViewState {
  switchValue: boolean;
}

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
