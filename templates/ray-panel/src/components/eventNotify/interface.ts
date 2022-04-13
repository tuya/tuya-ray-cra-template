import React from 'react';
export interface IState {
  show: boolean;
}

export interface IEventItemProps {
  title: string;
  status: string | number;
  style?: React.CSSProperties;
}

export interface IProps {
  title_name: string;
  image: any;
  valueList: Array<{ title: string; status: string }>;
  show: boolean;
  onClose: () => void;
}

export interface ILogicCompProps {
  title_name: string;
  image: any;
  thingModelDp: ThingAction;
}
