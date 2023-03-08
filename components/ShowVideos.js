import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { Alert } from 'react-native';
import { Video } from 'expo-av';
import axios from 'axios';
import { STOREVIDEO, URLSERVER } from './Config.js';
/* import * as MediaLibrary from 'expo-media-library'; */

export default function ShowVideos() {
    /* const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState(); */
    /* const [videoData, setVideoData] = useState(''); */
    const [videoURL, setVideoURL] = useState('');

    const CONFIGHEADER = {
        headers:{
            'Access-Control-Allow-Origin': '*'
        }
    };
    
    const getVideo = async () => {
        try {
            console.log("entra al tryhardeando");
            /* const idVideo = getData();*/
            let urlGet = `${URLSERVER}last`; 
            const response = await axios.get(urlGet, CONFIGHEADER);
            console.log(response.data[0]["name"]);
            setVideoURL(`${STOREVIDEO}${response.data[0]["name"]}`);  
            
        } catch (error) {
            Alert.alert(error);
        } ;
    }; 

    return (
        <View style={styles.container}>
          {videoURL && (
            <Video
              source={{ uri: videoURL }}
              style={styles.video}
              useNativeControls
              resizeMode="contain"
            />
          )}
          {!videoURL && (
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
      height: 600,
    }
  });

