import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, Dimensions } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const ResetPassword = () => {
  const navigation = useNavigation();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [timer, setTimer] = useState(180);

  useEffect(() => {
    if (step === 2 && timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [step, timer]);

  const formatTimer = () => {
    const min = Math.floor(timer / 60);
    const sec = timer % 60;
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
  };

  const handleNext = () => {
    if (step === 1) {
      if (!email.includes('@')) {
        setError('Enter a valid email');
        return;
      }
      setStep(2);
      setError('');
    } else if (step === 2) {
      if (code.length !== 5) {
        setError('Enter 5-digit code');
        return;
      }
      setStep(3);
      setError('');
    } else if (step === 3) {
      if (newPassword.length < 6) {
        setError('Password must be at least 6 characters');
        return;
      }
      if (newPassword !== confirmPassword) {
        setError('Passwords do not match');
        return;
      }
      navigation.navigate('Login');
    }
  };

  const renderTopImage = () => {
    let source;
    if (step === 1) {
      source = require('../assets/reset_password.png');
    } else if (step === 2) {
      source = require('../assets/confirm_email.png');
    } else {
      source = require('../assets/new_password.png');
    }
    return <Image source={source} style={styles.topImage} resizeMode="contain" />;
  };

  return (
    <View style={styles.container}>
      {renderTopImage()}

      <Text style={styles.title}>
        {step === 1 ? 'Reset Your Password' : step === 2 ? 'Confirm Your Email' : 'Enter New Password'}
      </Text>
      <Text style={styles.subtitle}>
        {step === 1
          ? 'Enter your email to get a reset link.'
          : step === 2
          ? `We sent a 5-digit code to ${email}`
          : 'Set a complex password to secure your account.'}
      </Text>

      {error !== '' && <Text style={styles.error}>{error}</Text>}

      {step === 1 && (
        <TextInput
          style={styles.input}
          placeholder="Email Address"
          placeholderTextColor="#999"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
      )}

      {step === 2 && (
        <View style={{ width: '100%' }}>
          <TextInput
            style={styles.input}
            placeholder="Verification Code"
            placeholderTextColor="#999"
            value={code}
            onChangeText={setCode}
            keyboardType="numeric"
          />
          <Text style={styles.resend}>
            {timer > 0 ? `Resend in ${formatTimer()}` : 'Resend Code'}
          </Text>
        </View>
      )}

      {step === 3 && (
        <>
          <TextInput
            style={styles.input}
            placeholder="New Password"
            placeholderTextColor="#999"
            secureTextEntry
            value={newPassword}
            onChangeText={setNewPassword}
          />
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            placeholderTextColor="#999"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
        </>
      )}

      <TouchableOpacity style={styles.button} onPress={handleNext}>
        <Text style={styles.buttonText}>
          {step === 1 ? 'Send Code' : step === 2 ? 'Verify' : 'Save Password'}
        </Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Need Help | FAQ | Terms of Use</Text>
      </View>
    </View>
  );
};

export default ResetPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  topImage: {
    width: width * 0.7,
    height: width * 0.6,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: '#777',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    backgroundColor: '#f2f2f2',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 15,
    fontSize: 16,
    marginBottom: 15,
  },
  button: {
    width: '100%',
    backgroundColor: '#555',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  error: {
    color: 'red',
    fontSize: 13,
    marginBottom: 10,
    textAlign: 'center',
  },
  resend: {
    fontSize: 12,
    color: '#999',
    marginTop: 5,
    textAlign: 'right',
  },
  footer: {
    position: 'absolute',
    bottom: 20,
  },
  footerText: {
    fontSize: 12,
    color: '#aaa',
    textAlign: 'center',
  },
});
