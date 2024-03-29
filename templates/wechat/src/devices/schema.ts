export const defaultSchema = [
  {
    attr: 128,
    canTrigger: true,
    code: 'switch_1',
    defaultRecommend: false,
    editPermission: false,
    executable: true,
    extContent: '',
    iconname: 'icon-dp_power2',
    id: 1,
    mode: 'rw',
    name: '开关1',
    property: {
      type: 'bool',
    },
    type: 'obj',
  },
  {
    attr: 640,
    canTrigger: true,
    code: 'countdown_1',
    defaultRecommend: true,
    editPermission: false,
    executable: true,
    extContent: '',
    iconname: 'icon-dp_time2',
    id: 9,
    mode: 'rw',
    name: '倒计时1',
    property: {
      unit: 's',
      min: 0,
      max: 86400,
      scale: 0,
      step: 1,
      type: 'value',
    },
    type: 'obj',
  },
  {
    attr: 736,
    canTrigger: false,
    code: 'relay_status',
    defaultRecommend: true,
    editPermission: false,
    executable: false,
    extContent: '',
    iconname: 'icon-dp_battery',
    id: 38,
    mode: 'rw',
    name: '上电状态设置',
    property: {
      range: ['off', 'on', 'memory'],
      type: 'enum',
    },
    type: 'obj',
  },
  {
    attr: 224,
    canTrigger: false,
    code: 'light_mode',
    defaultRecommend: false,
    editPermission: false,
    executable: false,
    extContent: '',
    iconname: 'tcl_function_light',
    id: 40,
    mode: 'rw',
    name: '指示灯状态设置',
    property: {
      range: ['relay', 'pos', 'none', 'on'],
      type: 'enum',
    },
    type: 'obj',
  },
  {
    attr: 224,
    canTrigger: false,
    code: 'child_lock',
    defaultRecommend: false,
    editPermission: false,
    executable: false,
    extContent: '',
    iconname: 'icon-dp_power',
    id: 41,
    mode: 'rw',
    name: '童锁开关',
    property: {
      type: 'bool',
    },
    type: 'obj',
  },
  {
    attr: 224,
    canTrigger: false,
    code: 'cycle_time',
    defaultRecommend: false,
    editPermission: false,
    executable: false,
    extContent: '',
    iconname: 'icon-dp_loop',
    id: 42,
    mode: 'rw',
    name: '循环定时',
    property: {
      type: 'string',
      maxlen: 255,
    },
    type: 'obj',
  },
  {
    attr: 224,
    canTrigger: false,
    code: 'random_time',
    defaultRecommend: false,
    editPermission: false,
    executable: false,
    extContent: '',
    iconname: 'icon-dp_circle',
    id: 43,
    mode: 'rw',
    name: '随机定时',
    property: {
      type: 'string',
      maxlen: 255,
    },
    type: 'obj',
  },
  {
    attr: 0,
    canTrigger: true,
    code: 'work_state',
    defaultRecommend: false,
    editPermission: false,
    executable: true,
    extContent: '',
    iconname: 'icon-zhuangtai',
    id: 44,
    mode: 'ro',
    name: '浪涌保护状态',
    property: {
      range: ['valid', 'invalid'],
      type: 'enum',
    },
    type: 'obj',
  },
] as const;
