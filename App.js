import { CameraView, useCameraPermissions } from 'expo-camera';
import { useRef, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
  Share,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Sharing from 'expo-sharing';

export default function App() {
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef(null);
  const [photo, setPhoto] = useState(null);
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [imageUri, setImageUri] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [showCamera, setShowCamera] = useState(false);

  if (!permission) return <View />;

  if (!permission.granted) {
    return (
      <View style={styles.centeredContainer}>
        <Text>Necesitas permitir acceso a la cámara</Text>
        <TouchableOpacity style={styles.button} onPress={requestPermission}>
          <Text style={styles.btnText}>Dar permiso</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const takePhoto = async () => {
    if (cameraRef.current) {
      const result = await cameraRef.current.takePictureAsync();
      setPhoto(result.uri);
      setImageUri(result.uri);
      setShowCamera(false);
    }
  };

  const validarLogin = () => {
    const validUser = 'admin';
    const validPass = '1234';
    if (user === validUser && pass === validPass) {
      Alert.alert('Correcto', 'Inicio de sesión exitoso');
      setLoggedIn(true);
    } else {
      Alert.alert('Error', 'Usuario o contraseña incorrectos');
    }
  };

  const cambiarImagen = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permiso denegado', 'Se necesita acceso a las imágenes');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.8,
    });
    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const abrirCamara = () => {
    setShowCamera(true);
    setPhoto(null);
  };

  const compartir = async () => {
    try {
      if (imageUri) {
        const available = await Sharing.isAvailableAsync();
        if (available) {
          await Sharing.shareAsync(imageUri);
        } else {
          await Share.share({
            message: `Mira mi foto de perfil (${user})`,
            url: imageUri,
          });
        }
      } else {
        await Share.share({
          message: `Hola, soy ${user}. ¡He iniciado sesión en la app!`,
        });
      }
    } catch (error) {
      Alert.alert('Error al compartir', error.message || String(error));
    }
  };

  const cerrarSesion = () => {
    setUser('');
    setPass('');
    setImageUri(null);
    setLoggedIn(false);
    setShowCamera(false);
    setPhoto(null);
  };

  if (showCamera) {
    return (
      <View style={styles.centeredContainer}>
        {!photo ? (
          <>
            <CameraView ref={cameraRef} style={styles.camera} />
            <View style={styles.cameraButtons}>
              <TouchableOpacity style={styles.cameraButton} onPress={takePhoto}>
                <Text style={styles.btnText}>Tomar Foto</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.cameraButton, styles.cancelButton]} onPress={() => setShowCamera(false)}>
                <Text style={styles.btnText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <>
            <Image source={{ uri: photo }} style={styles.camera} />
            <View style={styles.cameraButtons}>
              <TouchableOpacity style={styles.cameraButton} onPress={() => setShowCamera(false)}>
                <Text style={styles.btnText}>Usar esta foto</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.cameraButton, styles.cancelButton]} onPress={() => setPhoto(null)}>
                <Text style={styles.btnText}>Tomar otra</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.centeredContainer}>
      {!loggedIn ? (
        <View style={styles.loginBox}>
          <Text style={styles.title}>Inicio de Sesion</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Nombre de usuario:</Text>
            <TextInput
              placeholder="Nombre"
              style={styles.input}
              value={user}
              onChangeText={setUser}
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Contraseña:</Text>
            <TextInput
              placeholder="Contraseña"
              style={styles.input}
              value={pass}
              onChangeText={setPass}
              secureTextEntry
            />
          </View>

          <TouchableOpacity style={styles.mainButton} onPress={validarLogin}>
            <Text style={styles.btnText}>ADEPTAR</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.profileBox}>
          <Text style={styles.welcomeTitle}>Bienvenido {user}</Text>
          
          <TouchableOpacity onPress={cambiarImagen} activeOpacity={0.8}>
            {imageUri ? (
              <Image source={{ uri: imageUri }} style={styles.profileImage} />
            ) : (
              <View style={styles.imagePlaceholder}>
                <Image
                  source={{
                    uri: 'https://static.vecteezy.com/system/resources/previews/005/005/840/non_2x/user-icon-in-trendy-flat-style-isolated-on-grey-background-user-symbol-for-your-web-site-design-logo-app-ui-illustration-eps10-free-vector.jpg',
                  }}
                  style={styles.defaultImage}
                />
              </View>
            )}
          </TouchableOpacity>

          <View style={styles.actionButtons}>
            <TouchableOpacity style={[styles.actionButton, styles.shareButton]} onPress={compartir}>
              <Text style={styles.actionButtonText}>COMPARTIR</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={[styles.actionButton, styles.photoButton]} onPress={abrirCamara}>
              <Text style={styles.actionButtonText}>TOMAR UNA FOTO</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.logoutButton} onPress={cerrarSesion}>
            <Text style={styles.logoutButtonText}>Cerrar sesión</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: 20,
  },
  loginBox: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 30,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  profileBox: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 30,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#333',
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#555',
  },
  input: {
    width: '100%',
    borderWidth: 2,
    borderColor: '#e0e0e0',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    backgroundColor: '#fafafa',
  },
  mainButton: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 25,
    marginBottom: 15,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  shareButton: {
    backgroundColor: '#28a745',
  },
  photoButton: {
    backgroundColor: '#17a2b8',
  },
  actionButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  logoutButton: {
    backgroundColor: 'transparent',
    paddingVertical: 10,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#dc3545',
    marginTop: 10,
  },
  logoutButtonText: {
    color: '#dc3545',
    fontWeight: '600',
  },
  btnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginVertical: 20,
  },
  defaultImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  imagePlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  camera: {
    width: '100%',
    height: '80%',
    borderRadius: 10,
  },
  cameraButtons: {
    flexDirection: 'row',
    width: '100%',
    marginTop: 20,
  },
  cameraButton: {
    flex: 1,
    backgroundColor: '#007bff',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: '#6c757d',
  },
});