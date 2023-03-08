import AsyncStorage from '@react-native-async-storage/async-storage';
import { LASTVIDEOKEY } from './Config';

export const storeData = async (value) => {
    try {
      await AsyncStorage.setItem(LASTVIDEOKEY, value)
    } catch (e) {
      // saving error
      console.log(`storeData error: ${e}`)
    }
  }

export const getData = async () => {
    try {
      const value = await AsyncStorage.getItem(LASTVIDEOKEY)
      if(value !== null) {
        return value;
      }
    } catch(e) {
      // error reading value
      console.log(`getData error: ${e}`)
    }
  }