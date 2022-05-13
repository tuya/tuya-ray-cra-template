import { Observable } from 'rxjs/Observable';
import { ofType } from 'redux-observable';
import { mergeMap } from 'rxjs/operators';
import { actions } from './actions/common';

const { responseUpdateDp, updateDp } = actions;

const putDeviceData = ({ dps }) => {
  return new Promise((resolve, reject) => {
    const { deviceId } = ty.getLaunchOptionsSync().query;
    ty.device.publishDps({
      deviceId,
      dps, // {'1': true, '2': false}
      mode: 2,
      pipelines: [],
      options: {},
      success: () => resolve({ success: true }),
      fail: (d: any) => {
        console.log('-----返回结果错误?', d);
        reject(d);
      },
    });
  });
};

/**
 * epics
 */
const dpUpdateEpic$ = action$ => {
  return action$.pipe(
    ofType(updateDp.toString()),
    mergeMap((action: { payload: any }) => {
      const { payload } = action;
      const [success, error] = Observable.fromPromise(putDeviceData({ dps: payload }))
        .catch(() => Observable.of(responseUpdateDp({})))
        .partition((x: { success: boolean }) => x.success);

      return Observable.merge(
        success.map(() => responseUpdateDp(payload)), // 如果每次操作都必须等到上报以后再更新，可以注释掉本段代码
        error.map(() => responseUpdateDp({}))
      );
    })
  );
};

export const epics = [dpUpdateEpic$];
