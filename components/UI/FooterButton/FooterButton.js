import React from 'react';
import { Image } from 'react-native';
import {
  Button, Text,
} from 'native-base';

import FooterStyles from '../../../screens/main/Desktop/styles';
import NewsBadge from '../NewsBadge/NewsBadge';
import HomeIcon from '../../../assets/images/main.png';
import HomeActive from '../../../assets/images/main-ac.png';
import AppsIcon from '../../../assets/images/app.png';
import AppsActive from '../../../assets/images/app-ac.png';
import TasksIcon from '../../../assets/images/task.png';
import TasksActive from '../../../assets/images/task-ac.png';
import ChecksIcon from '../../../assets/images/check.png';
import ChecksActive from '../../../assets/images/check-ac.png';

const FooterButton = ({
  title, icon, active, newsCount, onPress,
}) => {
  const passiveIcon = icon === 'home' ? HomeIcon : icon === 'apps' ? AppsIcon : icon === 'checks' ? ChecksIcon : TasksIcon;
  const activeIcon = icon === 'home' ? HomeActive : icon === 'apps' ? AppsActive : icon === 'checks' ? ChecksActive : TasksActive;
  return (
    <Button onPress={onPress} style={FooterStyles.button}>
      <Image source={active ? activeIcon : passiveIcon} style={{ width: 20, height: 20 }} />
      {newsCount && (
        <NewsBadge count={newsCount} />
      )}

      <Text style={active ? FooterStyles.buttonTextActive : FooterStyles.buttonText}>
        {title}
      </Text>
    </Button>
  );
};

export default FooterButton;
