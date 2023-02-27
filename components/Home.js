import { Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import GoToButton from './GoToBotton.js';

export default function Home() {
    return (
        <View style={styles.container}>
            <Text style={styles.paragraph}>
                This app allows you to make recordings, share or save them. Enjoy it!
            </Text>  
            <GoToButton screenName='Camera' text='record'/>
            <View style={styles.separator}/>
            <GoToButton screenName='Videos' text='show video'/>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingTop: Constants.statusBarHeight,
        backgroundColor: '#ecf0f1',
        padding: 8,
    },
    paragraph: {
        margin: 24,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    separator: {
        height: 12
    }
});    