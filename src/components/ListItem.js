import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  Image,
  Linking,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import comments from '../assets/comments.png';

const ListItem = ({item, index}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        navigation.navigate('NewsPage', {id: item.id});
      }}
      accessibilityLabel={'newsItem'}>
      <Text style={styles.grey}>{index}</Text>
      <View style={styles.titleWrapper}>
        <Text style={styles.title} accessibilityLabel={'newsTitle'}>
          {item.title}
        </Text>

        {/* <TouchableOpacity
          onPress={async () => {
            if (Linking.canOpenURL(item.url)) {
              try {
                await Linking.openURL(item.url);
              } catch (e) {
                console.log('open url error', e);
              }
            }
          }}> */}
        <Text style={[styles.title, styles.url]} accessibilityLabel={'newUrl'}>
          {item.url}
        </Text>
      </View>
      <View style={styles.imageWrapper}>
        <Image
          source={comments}
          style={styles.image}
          accessibilityLabel={'commentsImage'}
        />
        <Text style={{color: 'grey'}}>{item.comments_count}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  imageWrapper: {
    flexGrow: 0.1,
    alignItems: 'flex-end',
  },
  image: {
    height: 20,
    width: 20,
    tintColor: 'steelblue',
  },
  titleWrapper: {
    flex: 1.2,
  },
  text: {
    color: 'grey',
  },
  title: {
    marginLeft: 20,
    flex: 1,
    flexWrap: 'wrap',
    color: 'grey',
  },
  url: {
    fontSize: 12,
    color: 'steelblue',
  },
});

export default ListItem;
