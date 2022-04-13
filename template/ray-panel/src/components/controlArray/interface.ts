export interface IProps {
  image: any;
  title_name: string;
  itemType: string; // 数组单项元素类型
  handleControl: (v: Array<any>) => void;
  maxSize: number; // 最大元素个数
  accessMode: string; // 可下发 or 仅上报
  value: Array<any>;
}
