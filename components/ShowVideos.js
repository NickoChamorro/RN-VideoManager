import axios from 'axios';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { Alert } from 'react-native';
import { Video } from 'expo-av';
/* import * as MediaLibrary from 'expo-media-library'; */
/* import { Image } from 'react-native'; */

export default function ShowVideos() {
    /* const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState(); */
    const [videoUri, setVideoUri] = useState(null);

    const CONFIGHEADER = {
        headers:{
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*'
        }
    };
    
    const getVideo = async () => {
        try {
            const response = await axios.get('http://44.211.156.25:443/videos/1', CONFIGHEADER);
            const blob = new Blob([response.data.uri], { type: 'video/mp4' });
            const dataUri = await blobToDataUri(blob);
            setVideoUri(dataUri);
    
        } catch (error) {
            Alert.alert(error);
        } ;
    }; 
    
    const blobToDataUri = (blob) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onerror = reject;
            reader.onload = () => {
                resolve(reader.result);
            };
            reader.readAsDataURL(blob);
        });
    };

    return (
        <View style={styles.container}>
          {videoUri && (
            <Video
              source={{ uri: videoUri }}
              style={styles.video}
              useNativeControls
              resizeMode="contain"
            />
          )}
          {!videoUri && (
            <Button title="Load Video" onPress={getVideo}/>
          )}
        </View>
      );  
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    video: {
      width: '100%',
      height: 300,
    }
  });

