import React, { Component } from 'react';
import Strings from '@/i18n';

function withLogic(Comp): React.ReactNode {
  class LogicComp extends Component<{ thingModelDp: ThingProperty }> {
    render() {
      const { param_value, title_name } = this.props;
      const { code } = this.props.thingModelDp ?? {};
      return <Comp value={param_value} title_name={title_name || code} />;
    }
  }

  return LogicComp;
}

export default withLogic;