import React from 'react';
import { connect } from 'react-redux';
import { FormLabel, FormInput, Button } from 'react-native-elements';
import { StyleSheet, View, Linking, AsyncStorage } from 'react-native';
import Colors from '../styles/constants/Colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { WebBrowser, AuthSession } from 'expo';
import { URL } from '../store';
import { setLogin } from '../store/appState';
import { signUpUser, loginUser } from '../store/user';
import axios from 'axios';
// import CookieManager from 'react-native-cookies';
import Cookie from 'react-native-cookie';

class LoginScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };
  }

  // async componentDidMount() {
  //   await axios.get(`${URL}/api/topics`);
  //   await axios.get(`${URL}/api/topics`);
  //   CookieManager.getAll().then(res => {
  //     console.log('CookieManager.getAll =>', res);
  //   });
  // }

  render() {
    const { navigation } = this.props;
    const { email, password } = this.state;
    if (this.props.email) {
      navigation.navigate('Main');
    }
    return (
      <View style={styles.container}>
        <View>
          <FormLabel labelStyle={styles.label}>Email</FormLabel>
          <FormInput
            inputStyle={styles.label}
            onChangeText={text => this.setState({ email: text })}
          />
          <FormLabel labelStyle={styles.label}>Password</FormLabel>
          <FormInput
            inputStyle={styles.label}
            onChangeText={text => this.setState({ password: text })}
          />
          <Button
            style={styles.button}
            raised
            title="SIGN UP"
            onPress={async () => {
              await this.props.signUpUser(email, password);
            }}
            color={Colors.backgroundColorBlue}
            backgroundColor={Colors.orange}
          />
          <Button
            style={styles.button}
            raised
            rightIcon={{ name: 'check' }}
            title="LOG IN"
            onPress={async () => {
              await this.props.loginUser(email, password);
            }}
            color={Colors.backgroundColorBlue}
            backgroundColor={Colors.orange}
          />
          {/* <Button
            style={styles.button}
            raised
            title="LOG IN WITH GOOGLE"
            onPress={async () => {
              let redirectUrl = AuthSession.getRedirectUrl();
              let result = await AuthSession.startAsync({
                authUrl: `${URL}/auth/google`,
              });
              console.log('RESULT: ', result);
              const login = result.type === 'success';
              this.props.setLogin(login);
              if (login) {
                navigation.navigate('Main');
              }
            }}
            color={Colors.backgroundColorBlue}
            backgroundColor={Colors.orange}
          /> */}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: Colors.backgroundColorBlue,
  },
  label: {
    fontSize: 24,
    color: Colors.orange,
    borderBottomColor: Colors.orange,
  },
  input: {
    borderBottomColor: Colors.orange,
    color: Colors.orange,
  },
  button: {
    marginTop: hp('5%'),
  },
});

const mapStateToProps = state => ({
  email: state.user.email,
});

const mapDispatchToProps = dispatch => ({
  setLogin: login => {
    dispatch(setLogin(login));
  },
  signUpUser: (email, password) => {
    dispatch(signUpUser(email, password));
  },
  loginUser: (email, password) => {
    dispatch(loginUser(email, password));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginScreen);
