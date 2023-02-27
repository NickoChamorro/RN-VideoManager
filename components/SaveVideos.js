import axios from 'axios';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import * as MediaLibrary from 'expo-media-library';
import { Alert } from 'react-native';
import { Image } from 'react-native';
import { Video } from 'expo-av';




export default function SaveVideos() {
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
            const response = await axios.get('https://videomanagerapi-production.up.railway.app/videos/5', CONFIGHEADER);
            /* return response.data.thumb; */
            const blob = new Blob([response.data.thumb], { type: 'video/mp4' });
            const dataUri = await blobToDataUri(blob);
            /* return dataUri; */
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

   /*  useEffect(() => {
        (async () => {
            const mediaLibraryPermission = await MediaLibrary.requestPermissionsAsync();
            setHasMediaLibraryPermission(mediaLibraryPermission.status === "granted");
        })();    
    }, []);  */   

    /* const video = getVideo(); */
    
    /* const saveVideo = async () => { */
        /* let video = await require('../assets/prueba.mp4');  
        let videoUri = await Image.resolveAssetSource(video).uri;*/

        /* const videoUri = await getVideo(); */

        /*
        MediaLibrary.createAssetAsync(videoUri).then(() => { // createAssetAsync saveToLibraryAsync
            Alert.alert("Estas siendo saludado")
        }).catch((error)=>{
            Alert.alert(videoUri);
        });
        */
    /* }    */ 

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

