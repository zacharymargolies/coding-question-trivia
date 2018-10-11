import React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import Swiper from 'react-native-deck-swiper';
import { connect } from 'react-redux';

import { fetchAllFacts } from '../server/store/fact';

class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  async componentDidMount() {
    await this.props.getFacts();
  }

  render() {
    if (this.props.facts.length) {
      return (
        <View style={styles.container}>
          <Swiper
            cards={this.props.facts}
            renderCard={fact => {
              return (
                <View style={styles.card}>
                  <Text style={styles.text}>{fact.content}</Text>
                </View>
              );
            }}
            onSwiped={cardIndex => {
              console.log(cardIndex);
              this.setState({ showContent: false });
            }}
            onSwipedAll={() => {
              console.log("You've finished all the cards!");
            }}
            cardIndex={0}
            backgroundColor="#4FD0E9"
            stackSize={3}
          />
        </View>
      );
    } else {
      return (
        <View>
          <Text>Loading</Text>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center'
  },
  contentContainer: {
    paddingTop: 30
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50
  },
  homeScreenFilename: {
    marginVertical: 7
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)'
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center'
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3
      },
      android: {
        elevation: 20
      }
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center'
  },
  navigationFilename: {
    marginTop: 5
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center'
  },
  helpLink: {
    paddingVertical: 15
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7'
  },
  card: {
    flex: 1,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#E8E8E8',
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  text: {
    textAlign: 'center',
    fontSize: 50,
    backgroundColor: 'transparent'
  }
});

const mapStateToProps = state => ({
  facts: state.fact.facts
});

const mapDispatchToProps = dispatch => ({
  getFacts: () => {
    dispatch(fetchAllFacts());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen);
