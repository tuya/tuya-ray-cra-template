import { TYSdk } from '@ray/ray-panel-core';

// 获取静态资源域名
export const getOssUrl = () => {
  return new Promise((resolve, reject) => {
    ty.apiRequestByAtop({
      api: 'tuya.m.app.panel.url.get',
      version: '1.0',
      postData: {},
      success: response => resolve(response),
      fail: error => reject(error),
      complete: result => {
        console.log('apiRequestByAtop', 'tuya.m.app.panel.url.get', result);
      },
    });
  });
};

// 获取面板多语言
export const getUiIdI18N = (uiId: string): Promise<Record<string, any>> => {
  return new Promise((resolve, reject) => {
    ty.apiRequestByAtop({
      api: 'tuya.m.ui.i18n.info.get',
      postData: { uiId },
      version: '1.0',
      success: response => {
        typeof response === 'string' ? resolve(JSON.parse(response)) : resolve(response);
      },
      fail: error => reject(error),
      complete: result => {
        console.log('apiRequestByAtop', 'tuya.m.ui.i18n.info.get', result);
      },
    });
  });
};

// 获取物模型信息
export const getDeviceThingDataSource = (): Promise<any> => {
  return new Promise((resolve, reject) => {
    TYSdk.device.getDeviceInfo().then(deviceInfo => {
      const { devId, dps } = deviceInfo;
      ty.device.getDeviceThingModelInfo({
        devId,
        success: (thingModelInfo: any) => {
          const { services } = thingModelInfo;
          if (services && services.length === 0) {
            console.warn('getDeviceThingModelInfo 调用成功，但是没有服务：', thingModelInfo);
            resolve(thingModelInfo);
          }
          if (services && services.length > 0) {
            const newServices = [];
            services.forEach(service => {
              const { properties, events, actions } = service;
              let modifiedProperties = properties.concat();
              if (properties && properties.length > 0) {
                modifiedProperties = properties.map(property => {
                  const { abilityId } = property;
                  return {
                    ...property,
                    value: dps[abilityId],
                  };
                });
              }
              newServices.push({ properties: modifiedProperties, events, actions });
            });
            console.log('getDeviceThingModelInfo 调用成功:', thingModelInfo);
            resolve({
              ...thingModelInfo,
              services: newServices,
            });
          }
        },
        fail: (error: any) => {
          console.log('getDeviceThingModelInfo 调用失败', error);
          reject(error);
        },
      });
    });
  });
};

// 下发属性
export const publishPropertyDpData = (payload: { [key: string]: any }): Promise<void> => {
  const { devId } = TYSdk.devInfo;
  return new Promise((resolve, reject) => {
    ty.device.publishThingModelMessage({
      devId,
      type: 0,
      payload,
      success: () => {
        console.log('publishThingModelMessage 调用成功');
        resolve();
      },
      fail: error => {
        console.warn('publishThingModelMessage 调用失败');
        reject(error);
      },
    });
  });
};

// 下发动作

export const publishActionDpData = (payload: {
  actionCode: string;
  inputParams: { code: string; typeSpec: { [key: string]: any } }[];
}): Promise<void> => {
  const { devId } = TYSdk.devInfo;
  return new Promise((resolve, reject) => {
    ty.device.publishThingModelMessage({
      devId,
      type: 1,
      payload,
      success: () => {
        console.log('publishThingModelMessage 调用成功');
        resolve();
      },
      fail: error => {
        console.warn('publishThingModelMessage 调用失败');
        reject(error);
      },
    });
  });
};
