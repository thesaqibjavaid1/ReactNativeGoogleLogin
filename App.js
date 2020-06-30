import React, {Component, Fragment} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Button,
  Image,
  StatusBar,
} from 'react-native';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-community/google-signin';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pushData: [],
      loggedIn: false,
    };
  }
  componentDidMount() {
    GoogleSignin.configure({});
  }
  _signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      this.setState({userInfo: userInfo, loggedIn: true});
      console.log(userInfo.user);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (f.e. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        console.log(error);
      }
    }
  };
  signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      this.setState({user: null, loggedIn: false}); // Remember to remove the user from your app's state as well
    } catch (error) {
      console.error(error);
    }
  };
  render() {
    return (
      <Fragment>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}>
            <View style={styles.body}>
              <View style={styles.sectionContainer}>
                <GoogleSigninButton
                  style={{width: 192, height: 48}}
                  size={GoogleSigninButton.Size.Wide}
                  color={GoogleSigninButton.Color.Dark}
                  onPress={this._signIn}
                />
              </View>
              <View style={styles.buttonContainer}>
                {!this.state.loggedIn && (
                  <Text>You are currently logged out</Text>
                )}
                {this.state.loggedIn && (
                  <Button
                    onPress={this.signOut}
                    title="Signout"
                    color="#841584"
                  />
                )}
              </View>

              {this.state.loggedIn && (
                <View>
                  <View style={styles.listHeader}>
                    <Text>User Info</Text>
                  </View>
                  <View style={styles.dp}>
                    <Image
                      style={{width: 100, height: 100}}
                      source={{
                        uri:
                          this.state.userInfo &&
                          this.state.userInfo.user &&
                          this.state.userInfo.user.photo,
                      }}
                    />
                  </View>
                  <View style={styles.detailContainer}>
                    <Text style={styles.title}>Name</Text>
                    <Text style={styles.message}>
                      {this.state.userInfo &&
                        this.state.userInfo.user &&
                        this.state.userInfo.user.name}
                    </Text>
                  </View>
                  <View style={styles.detailContainer}>
                    <Text style={styles.title}>Email</Text>
                    <Text style={styles.message}>
                      {this.state.userInfo &&
                        this.state.userInfo.user &&
                        this.state.userInfo.user.email}
                    </Text>
                  </View>
                  <View style={styles.detailContainer}>
                    <Text style={styles.title}>ID</Text>
                    <Text style={styles.message}>
                      {this.state.userInfo &&
                        this.state.userInfo.user &&
                        this.state.userInfo.user.id}
                    </Text>
                  </View>
                </View>
              )}
            </View>
          </ScrollView>
        </SafeAreaView>
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: 'grey',
  },
  listHeader: {
    backgroundColor: '#eee',
    color: '#222',
    height: 44,
    padding: 12,
  },
  detailContainer: {
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingTop: 10,
  },
  message: {
    fontSize: 14,
    paddingBottom: 15,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  dp: {
    marginTop: 32,
    paddingHorizontal: 24,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: 'white',
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: 'black',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: 'grey',
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: 'grey',
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
