import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  Image,
  Share,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import shareIcon from '../assets/shareIcon.png';
import TimeLine from '../components/TimeLine';

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

const News = ({navigation, route}) => {
  const [newsData, setNewsData] = useState({});
  const {id} = route.params;

  useEffect(() => {
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
    <>
      {newsData.comments?.length > 0 ? (
        <FlatList
          data={newsData.comments}
          ListHeaderComponent={() => (
            <View style={styles.header}>
              <Text>{newsData?.title}</Text>
            </View>
          )}
          renderItem={props => <TimeLine {...props} />}
        />
      ) : (
        <View style={styles.loading}>
          <Text>Loading...</Text>
        </View>
      )}
    </>
  );
};

export default News;

const styles = StyleSheet.create({
  header: {
    flexGrow: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: 20,
    width: 20,
    tintColor: 'steelblue',
  },
});
