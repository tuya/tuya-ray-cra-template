import React from 'react';
import _ from 'lodash';
import { useSelector, store, actions } from '@/redux';
import { scaleNumber } from '@/utils';
import { thingDpType } from '@/constant';

const { dispatch } = store;

function withLogic(Comp): React.ReactNode {
  function LogicComp(props: { thingModelDp: ThingAction; devId: string }) {
    const { thingModelDp, devId } = props;
    const { code, inputParams } = props.thingModelDp;
    const showModal = useSelector(state => state.showModal);
    // 过滤掉
    const filterFaultOrTime = params => {
      // 过滤掉时间型&故障型
      return params.filter(p => p?.typeSpec?.type !== 'date' && p?.typeSpec?.type !== 'bitmap');
    };

    const handleChange = data => {
      console.log('action handleChange', data);
      const params = {};
      data.forEach((d: { code: string | number; value: any }) => {
        params[d?.code] = d?.value ?? d?.defaultValue ?? d?.typeSpec?.typeDefaultValue;
      });
      console.log({
        devId,
        type: thingDpType.action,
        payload: { actionCode: thingModelDp.code, inputParams: params },
      });
      ty.device.publishThingModelMessage({
        devId,
        type: thingDpType.action,
        payload: { actionCode: thingModelDp.code, inputParams: params },
        success: () => console.log('下发成功'),
        fail: () => console.log('下发成功'),
      });
    };

    const handleCloseNotify = () => {
      dispatch(actions.common.toggleShowModel({ code: thingModelDp?.code, value: false }));
    };

    const getValueList = () => {
      const { outputParams } = thingModelDp;
      const list = [];
      outputParams.forEach(params => {
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

    return (
      <Comp
        title_notify_name={code}
        valueList={getValueList()}
        showNotifyModal={showModal[thingModelDp?.code]}
        handleCloseNotify={handleCloseNotify}
        title_name={code}
        inputParams={filterFaultOrTime(inputParams)}
        handleChange={handleChange}
      />
    );
  }

  return LogicComp;
}

export default withLogic;
