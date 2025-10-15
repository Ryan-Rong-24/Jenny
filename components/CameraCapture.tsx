import React from 'react';
import { View, Text, StyleSheet, Pressable, Animated, Image, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

interface CameraCaptureProps {
  onCapture: (uri: string) => void;
  isLoading: boolean;
  capturedImage: string | null;
}

export default function CameraCapture({ onCapture, isLoading, capturedImage }: CameraCaptureProps) {
  const scaleValue = React.useRef(new Animated.Value(1)).current;
  const [permissionGranted, setPermissionGranted] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      setPermissionGranted(status === 'granted');
    })();
  }, []);

  const handlePressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const takePicture = async () => {
    if (!permissionGranted) {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need camera permissions to make this work!');
        return;
      }
      setPermissionGranted(true);
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
      base64: true,
    });

    if (!result.canceled && result.assets[0]) {
      onCapture(result.assets[0].uri);
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
      base64: true,
    });

    if (!result.canceled && result.assets[0]) {
      onCapture(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      {capturedImage ? (
        <View style={styles.imageContainer}>
          <Image source={{ uri: capturedImage }} style={styles.image} />
          {isLoading && (
            <View style={styles.loadingOverlay}>
              <ActivityIndicator size="large" color="#007AFF" />
              <Text style={styles.loadingText}>Analyzing your face...</Text>
            </View>
          )}
        </View>
      ) : (
        <View style={styles.placeholderContainer}>
          <Image source={require('../assets/camera.png')} style={{ width: 64, height: 64, tintColor: '#ccc' }} />
          <Text style={styles.placeholderText}>Take a selfie to match the emoji!</Text>
        </View>
      )}
      
      <View style={styles.buttonContainer}>
        <Animated.View style={{ transform: [{ scale: scaleValue }], flex: 1 }}>
          <Pressable
            style={[styles.button, styles.primaryButton]}
            onPress={takePicture}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            disabled={isLoading}
          >
            <Image source={require('../assets/camera.png')} style={{ width: 24, height: 24, tintColor: '#fff' }} />
            <Text style={styles.primaryButtonText}>Take Photo</Text>
          </Pressable>
        </Animated.View>
        
        <Animated.View style={{ transform: [{ scale: scaleValue }], flex: 1 }}>
          <Pressable
            style={[styles.button, styles.secondaryButton]}
            onPress={pickImage}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            disabled={isLoading}
          >
            <Image source={require('../assets/images.png')} style={{ width: 24, height: 24, tintColor: '#007AFF' }} />
            <Text style={styles.secondaryButtonText}>Gallery</Text>
          </Pressable>
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  imageContainer: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#f0f0f0',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
  loadingText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#007AFF',
  },
  placeholderContainer: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 20,
    backgroundColor: '#fafafa',
    borderWidth: 2,
    borderColor: '#e0e0e0',
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
  placeholderText: {
    fontSize: 16,
    color: '#999',
    fontWeight: '500',
    textAlign: 'center',
    paddingHorizontal: 40,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 16,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 14,
    gap: 8,
  },
  primaryButton: {
    backgroundColor: '#007AFF',
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#007AFF',
  },
  secondaryButtonText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

