import { Image, ScrollView, Text, View } from '@ray-js/ray';
import {
  getAlarmMessages,
  getFamilyMessages,
  getNotificationMessages,
} from '@ray-js/wechat';
import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import styles from './index.module.less';

const dealHourFn = (time: string): any => {
  const [hours, minute] = time.split(':');
  let interval = '上午';
  let dealHour = Number(hours);
  if (dealHour >= 12) {
    interval = '下午';
    dealHour -= 12;
  }
  if (dealHour === 0) {
    dealHour = 12;
  }
  return {
    interval,
    hour: dealHour,
    minute: Number(minute),
    time: `${dealHour}:${minute}`,
  };
};

enum TabType {
  ALARM,
  HOME,
  NOTIFY,
}

interface Props {
  tab: TabType;
  hasIcon: boolean;
}

const actions = [getAlarmMessages, getFamilyMessages, getNotificationMessages];

const fetchData = async (type: TabType, pageNo: number) => {
  const res = await actions[type]({ pageNo });
  return res;
};

const List: FC<Props> = ({ tab, hasIcon }) => {
  const [pageNo, setPageNo] = useState<number>(1);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const loadingMore = useRef(false);

  useEffect(() => {
    // 获取告警消息
    fetchData(tab, 1).then((res) => {
      setData(res.messages);
      setPageNo(res.page_no);
      setTotalCount(res.total);
      setLoading(false);
    });
  }, []);

  const loadMore = useCallback(async () => {
    if (loadingMore.current) {
      return;
    }
    // 是否还有更多
    if (totalCount <= data.length) {
      return;
    }
    loadingMore.current = true;
    const res = await fetchData(tab, pageNo + 1);
    setPageNo(res.page_no);
    setTotalCount(res.total);
    setData([...data, ...res.messages]);

    loadingMore.current = false;
  }, [pageNo, tab, data, totalCount]);

  let lastValue = ['', ''];
  return (
    <View className={styles.container}>
      {totalCount === 0 ? (
        <View className={styles.empty}>暂无数据</View>
      ) : (
        <ScrollView
          scrollY
          className={styles.scroll}
          lowerThreshold={300}
          onScrollToLower={loadMore}
        >
          {data.map((item) => {
            // 计算时间
            let showDate = false;
            const [date, time] = item.date_time.split(' ');
            const [year, month, day] = date.split('-');
            const [lastMonth, lastDay] = lastValue;
            if (
              Number(month) !== Number(lastMonth) &&
              Number(day) !== Number(lastDay)
            ) {
              showDate = true;
              lastValue = [month, day];
            }
            const dealTime = dealHourFn(time);

            return (
              <View key={item.id}>
                {showDate && (
                  <View className={styles.date}>
                    <Text className={styles.day}>{day}</Text>
                    <Text className={styles.month}>{month}月</Text>
                  </View>
                )}
                <View className={styles.message}>
                  {hasIcon && <Image className={styles.icon} src={item.icon} />}
                  <View className={styles.messageBody}>
                    <View className={styles.messageTitle}>
                      {item.message_title}
                    </View>
                    <View className={styles.messageContent}>
                      {dealTime.interval}
                      {dealTime.time}｜{item.message_content}
                    </View>
                    {item.home_name && (
                      <View className={styles.from}>
                        来自： {item.home_name}
                      </View>
                    )}
                  </View>
                </View>
              </View>
            );
          })}
          {/* 占位 */}
          <View style={{ height: 16 }} />
        </ScrollView>
      )}
    </View>
  );
};

export default List;
