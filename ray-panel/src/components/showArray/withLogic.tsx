import React, { Component } from 'react';
// 展示型数组组件逻辑层

/* 待解决：
   1、功能名称多语言
   2、value值需要根据不同数据类型进行处理
*/

function withLogic(Comp): React.ReactNode {
  class LogicComp extends Component {
    render() {
      return <Comp value={[1, 2, 3]} />;
    }
  }

  return LogicComp;
}

export default withLogic;
