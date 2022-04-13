export interface IState {
  showModal: boolean;
  params: Array<Record<string, unknown>>;
}

export interface IActionItemProps {
  title: string;
  onChange: (event: { type: 'change'; value: boolean }) => void;
}

export interface IProps {
  title_notify_name: string;
  valueList: Array<{ title: string; status: string }>;
  showNotifyModal: boolean;
  handleCloseNotify: () => void;
  title_name: string;
  inputParams: Array<Record<string, unknown>>;
  handleChange: (data) => void;
}
