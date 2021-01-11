import React, { createRef, useState, useEffect } from 'react';
import { Camera } from 'expo-camera';
import { View } from 'native-base';
import { TouchableOpacity } from 'react-native';
import { Feather, FontAwesome5, FontAwesome } from '@expo/vector-icons';
import CameraStyles from '../../globalStyles/camera';

const CameraWrapper = ({ open, children, onAdd = () => null }) => {
  let camera = createRef();
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  useEffect(() => {
    if (open && !hasPermission) {
      (async () => {
        const { status } = await Camera.requestPermissionsAsync();
        setHasPermission(status === 'granted');
      })();
    }
  }, [open]);

  const takePic = async () => {
    if (camera) {
      const pic = await camera.takePictureAsync();
      console.log('picture', pic);
      pic.name = `${Date.now()}${pic?.uri?.slice(pic.uri.lastIndexOf('.'))}`;
      onAdd(pic);
    }
  };

  const changeType = () => {
    setType(
      type === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back,
    );
  };
  return (
    <>
      {open && hasPermission
        ? (
          <Camera
            ratio="16:12"
            flashMode="on"
            style={CameraStyles.root}
            type={type}
            ref={(ref) => {
              camera = ref;
            }}
          >
            <View style={CameraStyles.toolbar}>
              <TouchableOpacity onPress={changeType}>
                <Feather name="rotate-cw" size={40} color="white" />
              </TouchableOpacity>
              <TouchableOpacity onPress={takePic}>
                <FontAwesome5 name="camera" size={40} color="#fff" />
              </TouchableOpacity>
              <TouchableOpacity>
                <FontAwesome name="bolt" size={40} color="#fff" />
              </TouchableOpacity>

            </View>

          </Camera>
        ) : children}
    </>
  );
};

export default CameraWrapper;
