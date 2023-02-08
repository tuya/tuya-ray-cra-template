import { router } from 'ray';
import { getProductInfo, preloadPanel, openPanel } from '@ray-js/ray';
import { devices } from '@/devices';

// @ts-expect-error 本身就支持 promise 只是 ts 类型不符
const getProductInfoAsync: PromisifyTTT<typeof getProductInfo> = getProductInfo;

const getSubPanelParams = async () => {
  const { devId, productId } = devices.socket.getDevInfo();
  const productInfo = await getProductInfoAsync({ productId });
  return {
    deviceId: devId,
    initialProps: {
      brand: '#00B294',
    },
    extraInfo: {
      productId,
      productVersion: productInfo?.productVer,
      i18nTime: `${productInfo?.i18nTime}`,
      bizClientId: '000001d7tx',
      // uiType: productInfo.uiType,
      uiType: 'RN',
      uiPhase: productInfo?.uiPhase,
    },
  };
};

export const handleSettingClick = () => {
  router.push('/setting');
};

export const preloadOrGotoSubPanel = async (preload?: boolean) => {
  const params = await getSubPanelParams();
  return preload ? preloadPanel(params) : openPanel(params);
  // preload ? preloadPanel(params) : openRNPanel(params);
};
