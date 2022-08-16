import axios from 'axios';
import React, {useEffect, useState, useMemo} from 'react';
import {
  Image,
  Share,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import shareIcon from '../assets/shareIcon.png';

const shareContent = async data => {
  try {
    const result = await Share.share({
      message: data?.url || 'Here is the content',
    });
    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        // shared with activity type of result.activityType
        // console.log('share here', data.url);
      } else {
        // shared
      }
    } else if (result.action === Share.dismissedAction) {
      // dismissed
    }
  } catch (error) {
    console.log('error :', error);
  }
};

const NewsPage = ({navigation, route}) => {
  const [newsData, setNewsData] = useState({});
  const {id} = route.params;

  // navigation.setOptions({
  //   headerRight: () => {
  //     return (
  //       <TouchableOpacity onPress={() => shareContent(newsData)}>
  //         <Image source={shareIcon} style={styles.image} />
  //       </TouchableOpacity>
  //     );
  //   },
  // });

  useMemo(() => {
    const getNewsById = async () => {
      try {
        const response = await axios.get(
          `https://api.hackerwebapp.com/item/${id}`,
        );
        setNewsData(response.data);
        navigation.setOptions({headerTitle: response.data?.title});
      } catch (e) {
        // should be dealt separately as it is not part of this test
        console.log('something went wrong', e);
      }
    };
    getNewsById();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <TouchableOpacity onPress={() => shareContent(newsData)}>
            <Image source={shareIcon} style={styles.image} />
          </TouchableOpacity>
        );
      },
    });
  }, [navigation, newsData]);

  return (
    <View>
      <Text>{`Welcome to Timeline page`}</Text>
    </View>
  );
};

export default NewsPage;

const styles = StyleSheet.create({
  image: {
    height: 20,
    width: 20,
    tintColor: 'steelblue',
  },
});
