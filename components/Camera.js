import { StyleSheet, Text, View, Button, SafeAreaView, Alert } from 'react-native';
import { useEffect, useState, useRef } from 'react';
import { Camera } from 'expo-camera';
import { Video } from 'expo-av';
import { shareAsync } from 'expo-sharing';
import * as MediaLibrary from 'expo-media-library'; 
import axios from 'axios';
/*import * as FileSystem from 'expo-file-system';*/

export default function UseCamera() {
    let cameraRef = useRef();
    const [hasCameraPermission, setHasCameraPermission] = useState();
    const [hasMicrophonePermission, setHasMicrophonePermission] = useState();
    const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();
    const [isRecording, setIsRecording] = useState(false);
    const [video, setVideo] = useState();
    const CONFIGHEADER = {
        headers:{
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*' 
            /* 'Content-Type': 'multipart/form-data' */
        }
    };

    useEffect(() => {
        (async () => {
            const cameraPermission = await Camera.requestCameraPermissionsAsync();
            const microphonePermission = await Camera.requestMicrophonePermissionsAsync();
            const mediaLibraryPermission = await MediaLibrary.requestPermissionsAsync();

            setHasCameraPermission(cameraPermission.status === "granted");
            setHasMicrophonePermission(microphonePermission.status === "granted");
            setHasMediaLibraryPermission(mediaLibraryPermission.status === "granted");
        })();
    }, []);

    if (hasCameraPermission === undefined || hasMicrophonePermission === undefined) {
        return <Text>Requesting Permissions...</Text>
    } else if (!hasCameraPermission) {
        return <Text>Camera permissions not granted</Text>
    }

    let recordVideo = () => {
    setIsRecording(true);
    let options = {
        quality: "1080p",
        maxDuration: 5,
        mute: false
    };

    cameraRef.current.recordAsync(options).then((recordedVideo) => {
        setVideo(recordedVideo);
        setIsRecording(false);
    });
    };

    let stopRecording = () => {
        setIsRecording(false);
        cameraRef.current.stopRecording();
    };

    if (video) {
        let shareVideo = () => {
            shareAsync(video.uri).then(() => {
            setVideo(undefined);
            });
        };

        let uploadVideo = async () => {
            /* MediaLibrary.saveToLibraryAsync(video.uri).then(() => {
            setVideo(undefined);
            }); */

            try {
                
                const formData = new FormData();
                formData.append('video', {
                    uri: video.uri,
                    name: video.name, // 'video.mp4'
                    type: video.type // 'video/mp4'
                });
                
                const response = await axios.post('https://videomanagerapi-production.up.railway.app/videos', {thumb: formData});
                
                /* const response = await axios.get('https://videomanagerapi-production.up.railway.app/');
                Alert.alert(`Response: ${response.data.message}`); */

                /*
                const response = await fetch('https://videomanagerapi-production.up.railway.app/upload', {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                */
                Alert.alert(`${response.data.message}`);

            } catch (error) {
                Alert.alert(error);
            } finally {
                setVideo(undefined);
            };
        };

        return (
        <SafeAreaView style={styles.container}>
            <Video
            style={styles.video}
            source={{uri: video.uri}}
            useNativeControls
            resizeMode='contain'
            isLooping
            />
            <View style={styles.buttonContainers}>
                <Button title="Share" onPress={shareVideo} />
                <View style={styles.separator}/>
                {hasMediaLibraryPermission ? <Button title="Upload" onPress={uploadVideo} /> : undefined}
                <View style={styles.separator}/>
                <Button title="Discard" onPress={() => setVideo(undefined)} />
            </View>
        </SafeAreaView>
        );
    }

    return (
    <Camera style={styles.container} ref={cameraRef}>
        <View style={styles.buttonContainer}>
        <Button title={isRecording ? "Stop Recording" : "Record Video"} onPress={isRecording ? stopRecording : recordVideo} />
        </View>
    </Camera>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonContainer: {
        backgroundColor: "#fff",
        alignSelf: "flex-end"
    },
    buttonContainers: {
        flexDirection: 'row',
        padding: 10,
    },
    video: {
        flex: 1,
        alignSelf: "stretch"
    },
    separator: {
        width: 3
    }
});