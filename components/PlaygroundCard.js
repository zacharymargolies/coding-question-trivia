import React from 'react';
import { StyleSheet, Text, Image, View, TouchableOpacity } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import { setCurrentTopic, fetchFactsByTopic } from '../server/store/fact';
import { connect } from 'react-redux';

class PlaygroundCard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { selector, navigate } = this.props;
    return (
      <TouchableOpacity
        onPress={() => {
          navigate(`${selector.main}`);
        }}
        style={styles.container}
      >
        // TOPIC TEXT
        <Text
          adjustsFontSizeToFit={true}
          numberOfLines={1}
          style={styles.topicText}
        >
          {selector.main}
        </Text>
        // TOPIC IMAGE
        <Image style={styles.topicImage} source={{ uri: selector.image }} />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: '#ffb142',
    height: hp('20%'),
    width: wp('30%'),
    alignItems: 'center',
    margin: wp('1.0%'),
    borderRadius: wp('5%'),
    shadowColor: '#cc8e35',
    shadowOffset: {
      width: 0,
      height: 7
    },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,
    elevation: 10
  },
  topicText: {
    marginTop: hp('4%'),
    fontSize: 26,
    color: 'white'
  },
  topicImage: {
    marginTop: hp('0.5%'),
    height: hp('8%'),
    width: hp('8%'),
    borderRadius: hp('4%')
  }
});

const mapDispatchToProps = dispatch => ({
  setCurrentTopic: topicId => {
    dispatch(setCurrentTopic(topicId));
  },
  getFactsByTopic: topicId => {
    dispatch(fetchFactsByTopic(topicId));
  }
});

export default connect(
  null,
  mapDispatchToProps
)(PlaygroundCard);
