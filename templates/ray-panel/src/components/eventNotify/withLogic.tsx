import React from 'react';
import { useSelector, store, actions } from '@/redux';
import { scaleNumber } from '@/utils';
import { ILogicCompProps } from './interface';

const { dispatch } = store;

function withLogic(Comp) {
  return function LogicComp(props: ILogicCompProps) {
    const { title_name, image, thingModelDp } = props;
    const showModal = useSelector(state => state.showModal);
    const getValueList = () => {
      const { outputParams } = thingModelDp;
      const list = [];
      outputParams.forEach(params => {
        // params?.value要进行处理
        const { typeSpec } = params;
        let value;
        if (typeSpec?.type === 'value') {
          const { scale } = typeSpec;
          value = scaleNumber(scale, params?.value ?? 0);
        } else {
          value = params?.value;
        }

        list.push({ title: params?.code, status: value });
      });
      return list;
    };

    const handleClose = () => {
      dispatch(actions.common.toggleShowModel({ code: [thingModelDp?.code], value: false }));
    };

    return React.createElement(Comp, {
      title_name,
      image,
      valueList: getValueList(),
      show: showModal[thingModelDp?.code],
      onClose: handleClose,
    });
  };
}

export default withLogic;
