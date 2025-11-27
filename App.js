import { CameraView, useCameraPermissions } from 'expo-camera';
import { useRef, useState } from 'react';
import { Button, View, Image, Text } from 'react-native';

export default function App() {
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef(null);
  const [photo, setPhoto] = useState(null);

  if (!permission) return <View />;

  if (!permission.granted) {
    return (
      <View>
        <Text>Necesitas permitir acceso a la cámara</Text>
        <Button title="Dar permiso" onPress={requestPermission} />
      </View>
    );
  }

  const takePhoto = async () => {
    if (cameraRef.current) {
      const result = await cameraRef.current.takePictureAsync();
      setPhoto(result.uri);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {!photo ? (
        <>
          <CameraView ref={cameraRef} style={{ flex: 1 }} />
          <Button title="Tomar foto" onPress={takePhoto} />
        </>
      ) : (
        <>
          <Image source={{ uri: photo }} style={{ flex: 1 }} />
          <Button title="Tomar otra" onPress={() => setPhoto(null)} />
        </>
      )}
    </View>
  );
}




