declare module '*.module.less' {
  const classes: {
    readonly [key: string]: string;
  };
  export default classes;
  declare module '*.less';
}

declare global {
  interface Window {
    devToolsExtension?: () => any;
    __DEV__: boolean;
  }
}

type RequestRes = {
  data: string;
  statusCode: number;
  header: Record<string, string>;
  cookies: Array<string>;
  profile: any;
  taskId: string;
};

type RequestParams = {
  url: string;
  data?: string;
  header?: Record<string, string>;
  timeout?: number;
  method?: string;
  dataType?: string;
  responseType?: string;
  enableHttp2?: boolean;
  enableQuic?: boolean;
  enableCache?: boolean;
  success?: (successRes: RequestRes) => void;
  fail?: (successRes: RequestRes) => void;
  complete?: (successRes: RequestRes) => void;
};

export type DpType = 'bool' | 'value' | 'enum' | 'raw' | 'string' | 'bitmap';

export interface DpSchema {
  code: string;
  dptype: string;
  iconname: string;
  id: string;
  /**
   * type: 'bitmap' only
   */
  label?: string[] | undefined;
  /**
   * type: 'bitmap' only
   */
  maxlen?: number | undefined;
  /**
   * type: 'value' only
   */
  max?: number | undefined;
  /**
   * type: 'value' only
   */
  min?: number | undefined;
  mode: 'rw' | 'ro' | 'rw';
  name: string;
  /**
   * type: 'enum' only
   */
  range?: any[] | undefined;
  /**
   * type: 'value' only
   */
  scale?: number | undefined;
  /**
   * type: 'value' only
   */
  step?: number | undefined;
  type: DpType;
  /**
   * type: 'value' only
   */
  unit?: string | undefined;
}

export type NetworkType = 'WIFI' | 'GPRS' | 'BLE' | 'NONE';

export type DpValue = boolean | number | string;
// eslint-disable-next-line no-shadow
declare enum DpType {
  property,
  action,
  event,
}

interface IThingModel {
  /**
   * 物模型id
   */
  modelId: string;
  /**
   * 产品id
   */
  productId: string;
  /**
   * 产品版本
   */
  productVersion: string;
  /**
   * 服务列表
   */
  services: Array<ServiceModel>;
  /**
   * 扩展属性
   */
  extensions: Record<string, unknown>;
}

interface ServiceModel {
  /**
   * 属性列表
   */
  properties: Array<ThingProperty>;
  /**
   * 动作列表
   */
  actions: Array<ThingAction>;
  /**
   * 事件列表
   */
  events: Array<ThingEvent>;
}

type AccessMode = 'ro' | 'wr' | 'rw';

interface ThingProperty {
  code: string;
  /**
   *  属性id
   */
  abilityId: number;
  /**
   * 访问模式: ro-只读, wr-只写, rw-读写
   */
  accessMode: AccessMode;
  /**
   * 属性类型
   */
  typeSpec: Record<string, any>;
  /**
   * 属性默认值
   */
  defaultValue: Record<string, unknown>;
}

interface ThingAction {
  code: string;
  /**
   *  动作id
   */
  abilityId: number;
  /**
   * 动作的输入参数列表
   */
  inputParams: Array<Record<string, any>>;
  /**
   * 动作的输出参数列表
   */
  outputParams: Array<Record<string, any>>;
}

interface ThingEvent {
  code: string;
  /**
   * 事件id
   */
  abilityId: number;
  /**
   * 事件的输出参数列表
   */
  outputParams: Array<Record<string, any>>;
}

type ThingDp = ThingProperty | ThingAction | ThingEvent;

type OriginDpType = 'bool' | 'value' | 'enum' | 'raw' | 'string' | 'bitmap';

interface DevInfo<S = Record<string, OriginDpType>> {
  ability: number;
  activeTime: number;
  /**
   * @deprecated
   */
  appId: number;
  appKey: string;
  /**
   * @desc 网络是否在线
   */
  appOnline: boolean;
  attribute: number;
  baseAttribute: number;
  bv: number;
  capability: number;
  category: string;
  categoryCode: string;
  cloudOnline: boolean;
  codeIds: Record<string, string>;
  communication: Record<string, any>;
  devAttribute: number;
  /**
   * @desc 设备是否在线
   */
  deviceOnline: boolean;
  deviceType: number;
  devId: string;
  displayDps: any[];
  displayMsgs: Record<string, any>;
  displayOrder: number;
  dpMaxTime: number;
  dpName: Record<string | number, string>;
  dps: Record<number, string>;
  errorCode: number;
  faultDps: any[];
  gatewayVerCAD: string;
  gwType: string;
  homeDisplayOrder: number;
  homeId: number;
  i18nTime: number;
  iconUrl: string;
  idCodes: Record<number, string>;
  ip: string;
  isAdmin: boolean;
  isCloudOnline: boolean;
  /**
   * @desc 局域网是否在线
   */
  isLocalOnline: boolean;
  isMeshBleOnline: boolean;
  isNewFirmware: boolean;
  isShare: boolean;
  isUniversalPanel: boolean;
  isVDevice: boolean;
  latitude: string;
  localKey: string;
  longitude: string;
  lpv: number;
  meshId: string;
  name: string;
  networkType: NetworkType;
  originJson: Record<string, any>;
  panelConfig: {
    bic: Array<{ code: string; selected: boolean; value?: string | undefined }>;
    fun?: Record<string, any> | undefined;
  };
  pcc: string;
  productId: string;
  protocolAttribute: number;
  pv: number;
  quickOpDps: any[];
  rnFind: boolean;
  roomId: number;
  runtimeEnv: string;
  schema: {
    [K in keyof S]: DpSchema;
  };
  schemaExt: string;
  sharedTime: number;
  sigmeshId: string;
  standard: boolean;
  standSchemaModel: Record<string, any>;
  state: S;
  supportGroup: boolean;
  supportSGroup: boolean;
  timezoneId: string;
  ui: string;
  uiId: string;
  uiPhase: string;
  uiType: string;
  uiVersion: string;
  upgrading: boolean;
  uuid: string;
  vendorInfo: string;
  verSw: string;
  virtual: boolean;
  parentId?: string | undefined;
  groupId?: string | undefined;
}
