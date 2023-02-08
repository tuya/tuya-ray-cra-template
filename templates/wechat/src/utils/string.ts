import { utils } from '@ray-js/panel-sdk';

/**
 * @description: 将十进制值转换成二进制循环字符串
 * @param {number} loop
 * @return {*}
 */
export const toLoopBinString = (loop: number): string => {
  const list = [];
  for (let i = 0; i < 7; i++) {
    list.push(utils.getBitValue(loop, i))
  }
  return list.join('')
};
