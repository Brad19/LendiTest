import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  Image,
  Linking,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import iconNormal from '../assets/icons-comments-normal.png';
import iconBlue from '../assets/icons-comments-blue.png';
import {storeData, removeData} from '../utility/storage';

const ListItem = ({item, index, favoriteNews}) => {
  const navigation = useNavigation();
  const favorite =
    favoriteNews && favoriteNews.length > 0
      ? favoriteNews.find(favourite => favourite.id === item.id)
      : null;
  const [selectedFavorite, setSelectedFavorite] = useState(
    favorite ? true : false,
  );
  
  return (
    <View style={styles.container} key={item.id}>
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
          <Text
            style={[styles.title, styles.url]}
            accessibilityLabel={'newUrl'}>
            {item.url}
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          setSelectedFavorite(!selectedFavorite);
          if (!selectedFavorite) {
            storeData('favouriteNews', {id: item.id});
          } else {
            removeData('favouriteNews', {id: item.id});
          }
        }}
        style={styles.imageWrapper}>
        <Image
          source={selectedFavorite ? iconBlue : iconNormal}
          style={styles.image}
          accessibilityLabel={'commentsImage'}
        />
        <Text style={{color: 'grey'}}>{item.comments_count}</Text>
      </TouchableOpacity>
    </View>
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
    justifyContent: 'center',
  },
  image: {
    height: 25,
    width: 25,
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
