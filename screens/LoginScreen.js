import React from "react";
import { connect } from "react-redux";
import { FormLabel, FormInput, Button } from "react-native-elements";
import { StyleSheet, View, Linking } from "react-native";
import Colors from "../styles/constants/Colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import { WebBrowser, AuthSession } from "expo";
import { URL } from "../store";
import { setLogin } from "../store/appState";
import axios from "axios";

class LoginScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = null;
  }

  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <View>
          <FormLabel labelStyle={styles.label}>Username</FormLabel>
          <FormInput
            inputStyle={styles.label}
            onChangeText={text => this.setState({ username: text })}
          />
          <FormLabel labelStyle={styles.label}>Password</FormLabel>
          <FormInput
            inputStyle={styles.label}
            onChangeText={text => this.setState({ password: text })}
          />

          <Button
            style={styles.button}
            raised
            rightIcon={{ name: "check" }}
            title="SUBMIT"
            onPress={() => console.log("SUBMIT PRESSED")}
            color={Colors.backgroundColorBlue}
            backgroundColor={Colors.orange}
          />
          <Button
            style={styles.button}
            raised
            title="LOG IN WITH GOOGLE"
            // onPress={async () => {
            //   Linking.openURL(`${URL}/auth/google`);
            // }}
            onPress={async () => {
              let result = await AuthSession.startAsync({
                authUrl: `${URL}/auth/google`
              });
              console.log("RESULT: ", result);
              const login = result.type === "success" ? true : false;
              const me = await axios.get("http://localhost:8080/auth/me", {
                withCredentials: true
              });
              console.log("ME: ", me);
              this.props.setLogin(login);
              if (login) {
                navigation.navigate("Main");
              }
            }}
            color={Colors.backgroundColorBlue}
            backgroundColor={Colors.orange}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: Colors.backgroundColorBlue
  },
  label: {
    fontSize: 24,
    color: Colors.orange,
    borderBottomColor: Colors.orange
  },
  input: {
    borderBottomColor: Colors.orange,
    color: Colors.orange
  },
  button: {
    marginTop: hp("5%")
  }
});

const mapDispatchToProps = dispatch => ({
  setLogin: login => {
    dispatch(setLogin(login));
  }
});

export default connect(
  null,
  mapDispatchToProps
)(LoginScreen);