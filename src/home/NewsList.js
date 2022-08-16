import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, FlatList, View, Text, TextInput} from 'react-native';
import axios from 'axios';
import {useDebounce} from 'use-debounce';
import ListItem from '../components/ListItem';
import {SafeAreaView} from 'react-native-safe-area-context';

const baseUrl = 'https://api.hackerwebapp.com';

const News = () => {
  const [newsData, setNewsData] = useState([]);
  const [originalNewsData, setOriginalNewsData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    const getNewsFromHackerWebApp = async () => {
      try {
        const response = await axios.get(`${baseUrl}/news`);
        setNewsData(response.data);
        setOriginalNewsData(response.data);
      } catch (e) {
        console.log('e :', e);
      }
    };
    getNewsFromHackerWebApp();
  }, []);

  const debounceSearchTerm = useDebounce(searchTerm, 700);
  const debounceSearchTermValue = debounceSearchTerm[0].trim();

  useEffect(() => {
    if (
      debounceSearchTerm &&
      debounceSearchTermValue &&
      !debounceSearchTermValue.match(
        /[!"`'#%&,:;<>=@{}~\$\(\)\*\+\/\\\?\[\]\^\|]+/,
      )
    ) {
      const filteredData = newsData?.filter(item => {
        const searchTermTobeCompared = new RegExp(debounceSearchTermValue, 'i');
        const combinedItemKeyValues = Object.values(item).join('\t');
        return combinedItemKeyValues.match(searchTermTobeCompared);
      });
      if (filteredData.length > 0) {
        setNewsData(filteredData);
      }
    } else {
      setNewsData(originalNewsData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounceSearchTermValue]);

  return (
    <SafeAreaView
      style={[styles.safeAreaStyle, {flex: newsData?.length > 0 ? 0 : 1}]}>
      <View style={styles.screenTitleContainer}>
        <Text style={styles.screenTitle}>News</Text>
        <TextInput
          style={styles.input}
          placeholder={'Search'}
          ref={inputRef}
          onChangeText={text => setSearchTerm(text)}
          value={searchTerm}
          accessibilityLabel="searchInput"
        />
      </View>
      {newsData?.length > 0 ? (
        <FlatList
          data={newsData}
          style={styles.list}
          renderItem={({item, index}) => {
            return <ListItem item={item} index={index + 1} />;
          }}
          ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
          accessibilityLabel={'newsDataList'}
        />
      ) : (
        <View style={styles.message}>
          <Text>Oops. Sorry, Please try again later</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    marginVertical: 15,
    borderWidth: 2,
    paddingVertical: 10,
    borderRadius: 50,
    paddingLeft: 20,
  },
  list: {
    flexGrow: 1,
    marginTop: 10,
    marginBottom: 80,
  },
  itemSeparator: {
    flex: 1,
    borderWidth: 0.5,
    borderColor: 'lightgrey',
  },
  message: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  safeAreaStyle: {
    bottom: 10,
    backgroundColor: 'white',
  },
  screenTitleContainer: {
    height: 75,
    marginTop: 50,
    marginHorizontal: 10,
    paddingBottom: 10,
  },
  screenTitle: {
    fontWeight: '700',
    fontSize: 30,
  },
});

export default News;
