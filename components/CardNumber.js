import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';

const CardNumber = props => {
  return (
    <View style={styles.cardNumberContainer}>
      <Text style={styles.cardNumber}>{props.cur}</Text>
      <View style={styles.line} />
      <Text style={styles.cardNumber}>{props.len}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  cardNumberContainer: {
    display: 'flex',
    alignItems: 'center',
    width: wp('10.0%'),
    height: hp('5.0%'),
    borderWidth: wp('1.0%'),
    borderRadius: wp('2.0%'),
    borderColor: '#84817a',
    position: 'absolute',
    bottom: hp('1.5%'),
    right: wp('3.0%')
  },
  cardNumber: {
    color: '#84817a'
  },
  line: {
    borderWidth: wp('0.25%'),
    borderColor: '#84817a',
    width: '80%'
  }
});

export default CardNumber;
