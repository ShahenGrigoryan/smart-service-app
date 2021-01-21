import React from 'react';
import { Button, Text } from 'native-base';

const CheckStatusButton = ({ status, changeStatus }) => (
  <Button
    disabled={status === 'finished'}
    style={{
      borderRadius: 10, backgroundColor: status === 'finished' ? 'green' : 'grey', zIndex: -99, position: 'relative',
    }}
    onPress={() => {
      if (status !== 'finished') {
        changeStatus();
      }
    }}
  >
    <Text>
      {status === 'processing'
        ? 'Завершить' : status === 'pending'
          ? 'Начать' : 'Выполнено'}
    </Text>
  </Button>
);

export default CheckStatusButton;
