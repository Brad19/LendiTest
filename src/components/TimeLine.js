import React, {useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import RenderHtml from 'react-native-render-html';
import {timeDifference} from '../utility/utility';

const TimeLine = ({item}) => {
  const [contentHeight, setContentHeight] = useState(1);
  const source = {
    html: `${item?.content}`,
  };
  return (
    <>
      <View style={styles.container}>
        <View style={[styles.firstContainer]}>
          <View style={[styles.timeWrapper]}>
            <Text style={{paddingHorizontal: 2}}>
              {timeDifference(item.time)}
            </Text>
          </View>
        </View>
        <View style={styles.secondContainer}>
          <View style={styles.dot} />
          <View style={[styles.line, {height: contentHeight * 0.75}]} />
        </View>
        <View
          style={styles.thirdContainer}
          onLayout={e => {
            const {height} = e.nativeEvent.layout;
            setContentHeight(height);
          }}>
          <Text style={styles.user}>{`\u2022 ${
            item.user
          } \u2022 ${timeDifference(item.time, 'hours')}`}</Text>
          <RenderHtml contentWidth={300} source={source} />
          {item?.comments?.length > 1 && (
            <View style={styles.comments}>
              <Text>{`\u2022 ${item?.comments?.length} comments`} </Text>
            </View>
          )}

          <View style={styles.underline} />
        </View>
      </View>
    </>
  );
};

export default TimeLine;

const styles = StyleSheet.create({
  comments: {
    flex: 1,
    marginLeft: 10,
    height: 30,
    backgroundColor: 'lightgrey',
    borderRadius: 5,
    justifyContent: 'center',
  },
  container: {
    flexGrow: 1,
    flexDirection: 'row',
  },
  dot: {
    width: 30,
    height: 30,
    borderRadius: 30,
    backgroundColor: 'blue',
  },
  firstContainer: {
    flexShrink: 0.5,
    paddingHorizontal: 5,
    paddingVertical: 10,
  },
  line: {
    borderLeftWidth: 1,
  },
  secondContainer: {
    flexShrink: 0.2,
    paddingVertical: 10,
    alignItems: 'center',
  },
  thirdContainer: {
    flexShrink: 6,
    paddingVertical: 12,
    paddingHorizontal: 10,
  },
  timeWrapper: {
    flexShrink: 1,
    height: 30,
    borderRadius: 30,
    backgroundColor: 'lightblue',
    justifyContent: 'center',
    paddingRight: 5,
  },
  underline: {
    paddingVertical: 10,
    borderColor: 'grey',
    borderBottomWidth: 1,
  },
  user: {
    color: 'darkblue',
    fontSize: 15,
    fontWeight: '700',
  },
});
