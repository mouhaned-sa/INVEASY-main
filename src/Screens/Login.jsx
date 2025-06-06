/* eslint-disable prettier/prettier */
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  ImageBackground,
  Dimensions,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {login} from '../Services/user';
import AsyncStorage from '@react-native-community/async-storage';

const {width} = Dimensions.get('window');

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();

  const handleLogin = async () => {
    const data = await login({email, password});
    await AsyncStorage.setItem('token', data.token);
    console.log(data.token);
    data ? navigation.navigate('User') : Alert.alert('Error', 'bad data');
  };

  const handleResetPassword = () => {
    console.log('Redirect to reset password');
  };

  const handleCreateAccount = () => {
    navigation.navigate('Register');
  };

  return (
    <ImageBackground
      source={require('../Assets/UI/login.png')}
      resizeMode="cover"
      style={styles.container}>
      <Image
        source={require('../Assets/Images/GiftAcc.png')} // Replace with your actual logo path
        style={styles.accecoire}
        resizeMode="contain"
      />
      <Image
        source={require('../Assets/Icons/Wishit.png')} // Replace with your actual logo path
        style={styles.logo}
        resizeMode="contain"
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleResetPassword}>
        <Text style={styles.resetText}>Forgot Password?</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.createAccount}
        onPress={handleCreateAccount}>
        <Text style={styles.createText}>Create Account</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  accecoire: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: width * 0.4,
    height: width * 0.4,
  },
  logo: {
    width: 200,
    height: 150,
    marginBottom: 40,
    marginTop: 80,
  },
  input: {
    width: 300,
    height: 60,
    borderColor: '#fff',
    borderWidth: 3,
    borderRadius: 33,
    backgroundColor: '#efefef',
    paddingHorizontal: 20,
    color: 'black',
    marginBottom: 16,
    fontSize: 16,
  },
  resetText: {
    color: 'white',
    marginTop: -100,
    paddingVertical: 8,
    marginBottom: 2,
    width: width * 0.75,
    alignSelf: 'flex-start',
    fontSize: 15,
  },
  loginButton: {
    width: '150',
    backgroundColor: '#8899AA',
    paddingVertical: 12,
    borderRadius: 33,
    alignItems: 'center',
    marginBottom: -10,
    marginTop: 50,
  },
  loginText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
  createText: {
    color: 'white',
    fontWeight: 'bold',
    paddingVertical: 16,
    margin: 10,
  },
});
