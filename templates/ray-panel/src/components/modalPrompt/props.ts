export interface IPromptProps {
  show: boolean;
  value?: string;
  bg_width?: number;
  bg_color?: string;
  bg_singRadius?: number;
  title?: string;
  title_name?: string;
  title_color?: string;
  title_fontSize?: number;
  title_fontWeight?: FontWeightType;
  cancel_name?: string;
  confirm_name?: string;
  maxlen?: number;
  onCancel?: (event: { type: 'cancel' }) => void;
  onConfirm?: (event: { type: 'confirm'; value: string }) => void;
}

export const defaultPromptProps = {
  value: '',
  show: false,
  bg_width: '622rpx',
  bg_color: '#FFF',
  bg_singRadius: '32rpx',
  title_name: 'DP Name',
  title_color: 'rgba(0, 0, 0, 0.9)',
  title_fontSize: '34rpx',
  title_fontWeight: '600',
  cancel_name: 'Cancel',
  confirm_name: 'Confirm',
  title: 'Title',
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
