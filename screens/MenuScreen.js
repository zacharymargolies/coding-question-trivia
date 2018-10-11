import axios from 'axios';
import React, { Component } from 'react';
import { List, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { setCurrentTopic } from '../server/store/fact';

const icon = 'av-timer';

class MenuScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      topics: []
    };
  }

  async componentDidMount() {
    const request = await axios.get('http://localhost:8080/api/topics/');
    this.setState({ topics: request.data });
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <List>
        {this.state.topics.map(topic => (
          <ListItem
            onPress={() => {
              console.log('LIST ITEM PRESSED: ', topic.id);
              this.props.setCurrentTopic(topic.id);
              navigate('Home');
            }}
            key={topic.main}
            title={topic.main}
            leftIcon={{ name: icon }}
          />
        ))}
      </List>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setCurrentTopic: topicId => {
    dispatch(setCurrentTopic(topicId));
  }
});

export default connect(
  null,
  mapDispatchToProps
)(MenuScreen);
