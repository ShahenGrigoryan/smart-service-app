import { Toast, View } from 'native-base';
import React, { useEffect } from 'react';

export default function Toaster({ text, type = 'default', buttonText }) {
  useEffect(() => {
    setTimeout(() => {
      Toast.show({
        text, type, buttonText,
      });
    }, 2000);
  }, []);
  return (
    <View />
  );
}
