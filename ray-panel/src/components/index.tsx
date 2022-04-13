import { LogicShowText } from './showText';
import { LogicShowTime } from './showTime';
import { LogicEventNotify } from './eventNotify';
// eslint-disable-next-line import/no-cycle
import { LogicPushAction } from './pushAction';
// eslint-disable-next-line import/no-cycle
import { LogicControlArray } from './controlArray';
import BoolView from './boolView';
import StringView from './stringView';
import NumberView from './numberView';
import StructureView from './structureView';
import menuView from './menuView';
import structureRoView from './structureRoView';

export { default as Connect } from './connect';

export const CompList = {
  prop: {
    // 展示型组件
    ro: {
      date: LogicShowTime,
      string: LogicShowText,
      raw: LogicShowText,
      value: LogicShowText,
      enum: LogicShowText,
      bool: LogicShowText,
      struct: structureRoView,
      array: LogicControlArray,
      bitmap: null,
    },
    // 控制型组件
    rwOrWr: {
      date: LogicShowTime,
      string: StringView,
      raw: StringView,
      value: NumberView,
      enum: menuView,
      bool: BoolView,
      struct: StructureView,
      array: LogicControlArray,
      bitmap: null,
    },
  },
  action: LogicPushAction,
  event: LogicEventNotify,
};
