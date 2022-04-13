export interface INumberViewProps {
  param_value: number;
  min?: number;
  max?: number;
  step?: number;
  image?: string;
  unit?: string;
  bg_color?: string;
  bg_singRadius?: number;
  bg_width?: number;
  bg_padding?: [number, number, number, number];
  image_size?: number;
  image_radius?: number;
  title_name?: string;
  title_color?: string;
  title_fontSize?: number;
  title_fontWeight?: FontWeightType;
  slider_thumb_color?: string;
  slider_minTrack_color?: string;
  slider_maxTrack_color?: string;
  param_color?: string;
  param_fontSize?: number;
  param_fontWeight?: FontWeightType;
  style?: React.CSSProperties;
  scale?: number;
  onChange?: (event: { type: 'change'; value: number }) => void;
  onChanging?: (event: { type: 'changing'; value: number }) => void;
}

export const defaultNumberViewProps = {
  min: 0,
  max: 100,
  step: 1,
  title_name: 'NumberView',
  title_fontSize: '30rpx',
  title_fontWeight: 'normal',
  title_color: '#3D3D3D',
  bg_color: '#fff',
  bg_singRadius: '28rpx',
  bg_width: '720rpx',
  bg_padding: ['48rpx', '40rpx', '48rpx', '40rpx'],
  image_size: '28rpx',
  image_radius: 0,
  slider_thumb_color: '#FFF',
  slider_minTrack_color: '#158CFC',
  slider_maxTrack_color: '#E3E9EE',
  param_color: '#158CFB',
  param_fontSize: '30rpx',
  param_fontWeight: 'normal',
};

export interface INumberViewState {
  sliderValue: number;
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
