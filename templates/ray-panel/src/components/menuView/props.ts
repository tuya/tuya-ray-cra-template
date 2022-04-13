export interface IMenuViewProps {
  image?: string;
  dataSource: string[];
  param_value?: string;
  bg_padding?: [number, number, number, number];
  onChange?: (event: { type: 'change'; value: string }) => void;
  bg_color?: string;
  bg_singRadius?: number;
  bg_width?: number;
  image_size?: number;
  image_radius?: number;
  title_name?: string;
  title_color?: string;
  title_fontSize?: number;
  title_fontWeight?: FontWeightType;
  button_bg_color_active?: string;
  button_bg_color_unactive?: string;
  button_bg_radius?: number;
  button_text_color_active?: string;
  button_text_color_unactive?: string;
  button_text_fontSize_active?: number;
  button_text_fontWeight_active?: FontWeightType;
  style?: React.CSSProperties;
}

export const defaultMenuViewProps = {
  title_name: 'MenuView',
  param_value: 'Demo1',
  bg_color: '#fff',
  bg_singRadius: '28rpx',
  bg_width: '720rpx',
  image_size: '28rpx',
  image_radius: 0,
  title_color: '#3D3D3D',
  title_fontSize: '30rpx',
  title_fontWeight: 'normal',
  button_bg_color_active: '#158CFB',
  button_bg_color_unactive: 'rgba(21, 140, 251, 0.1)',
  button_bg_radius: '32rpx',
  button_text_fontSize_active: '24rpx',
  button_text_fontWeight_active: 'normal',
  button_text_color_active: '#FFF',
  button_text_color_unactive: '#158CFB',
  bg_padding: ['48rpx', '40rpx', '32rpx', '40rpx'],
};

export interface IMenuViewState {
  activeValue: string;
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
