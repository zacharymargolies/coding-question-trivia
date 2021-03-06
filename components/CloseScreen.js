import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp
} from 'react-native-responsive-screen';
import Colors from '../styles/constants/Colors';

export default class CloseScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { goBack } = this.props.navigation;
    return (
      <TouchableOpacity style={styles.container} onPress={() => goBack()}>
        <Text style={styles.text}>X</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    zIndex: 2,
    top: hp('5%'),
    left: wp('87.0%')
  },
  text: {
    fontSize: 50,
    fontFamily: 'Arial Rounded MT Bold',
    color: Colors.orange,
    textShadowColor: Colors.shadowOrange,
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5
  }
});
