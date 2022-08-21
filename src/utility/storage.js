import AsyncStorage from '@react-native-async-storage/async-storage';

const storeData = async (key, value) => {
  try {
    console.log('Object.keys(value) :', Object.keys(value));
    if (Object.keys(value).length > 0) {
      const item = (await getData(key)) || [];
      // if (item.length === 0) {
      console.log('item :', item);
      console.log('passed value :', value);
      item.push(value);
      const jsonValue = JSON.stringify(item);
      console.log('jsonValue :', jsonValue);
      await AsyncStorage.setItem(key, jsonValue);
      return;
      // }
    }
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.log('save error :', e);
    // saving error
  }
};

const removeData = async (key, value) => {
  try {
    const itemArray = (await getData(key)) || [];
    console.log('---- itemArray - removeData ----');
    if (itemArray.length > 0) {
      const index = itemArray.findIndex(item => item.id === value?.id);
      console.log('index :', index);
      itemArray.splice(index, 1);
      const jsonValue = JSON.stringify(itemArray);
      console.log('jsonValue after removing:', jsonValue);
      await AsyncStorage.setItem(key, jsonValue);
    }
  } catch (e) {
    console.log('remove error :', e);
  }
};

const getData = async key => {
  try {
    const value = await AsyncStorage.getItem(key);
    console.log('value : getData', value);
    console.log('Array.isArray(value) :', Array.isArray(value));
    if (value !== null) {
      // value previously stored
      // if (Array.isArray(value)) {
      const parsedValue = JSON.parse(value);
      console.log('parsedValue', parsedValue);
      return parsedValue;
    }
    return null;
  } catch (e) {
    // error reading value
  }
};

export {storeData, getData, removeData};
