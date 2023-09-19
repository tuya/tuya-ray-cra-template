import React from 'react';
import { View, Button, Text, location, router } from '@ray-js/ray';

export default function Home() {
  return (
    <View>
      {Object.keys(location).map((key) => {
        return (
          <View key={key}>
            <Text>
              {key}: {JSON.stringify(location[key])}
            </Text>
          </View>
        );
      })}
    </View>
  );
}
