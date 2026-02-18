import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Pressable,
} from 'react-native';
import { ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import bgImage from "../asset/image/Vector 1.png"
export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hidePassword, setHidePassword] = useState(true);
  const [loading, setLoading] = useState(false);

  const togglePasswordVisibility = () => setHidePassword(!hidePassword);

  const handleLogin = async () => {
          navigation.replace('Form');
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(
        'https://mobileappdevelopmentindia.com/elevatortoolbackend/api/v1/user/login',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();

      if (data.status) {
        Alert.alert('Success', data.message);
        const token = data.data.token;
        
      } else {
        Alert.alert('Error', data.message);
      }
    } catch {
      Alert.alert('Error', 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Purple Header Section */}
      <ImageBackground source={bgImage} style={styles.background}>
      <View style={styles.header}>
        <View style={{ flex: 1 }}>
          <Text style={styles.welcomeText}>
            Welcome to{'\n'}
            <Text style={styles.underlineText}>Serena</Text>
          </Text>
          <Text style={styles.subTitle}>Where Your Care Becomes{'\n'}Your Career</Text>
        </View>
        <TouchableOpacity style={styles.globeIcon}>
          <FontAwesome5 name="globe" size={22} color="#fff" />
        </TouchableOpacity>
      </View>
</ImageBackground>
      {/* White curved shape under header */}
      <View style={styles.curveShape}>
        <Text style={styles.description}>
          Serena Helps You Learn, Grow, And Connect{'\n'}With Families Who Value Your Work
        </Text>

        {/* Form Section */}
        <View style={styles.form}>
          {/* Email input */}
          <View style={styles.inputContainer}>
            <Icon name="email-outline" size={22} color="#666" style={styles.inputIcon} />
            <TextInput
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              style={styles.input}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholderTextColor="#999"
            />
          </View>

          {/* Password input */}
          <View style={styles.inputContainer}>
            <Icon name="lock-outline" size={22} color="#666" style={styles.inputIcon} />
            <TextInput
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              style={[styles.input, { flex: 1 }]}
              secureTextEntry={hidePassword}
              autoCapitalize="none"
              placeholderTextColor="#999"
            />
            <Pressable onPress={togglePasswordVisibility} style={styles.eyeIcon}>
              <Icon
                name={hidePassword ? 'eye-off-outline' : 'eye-outline'}
                size={22}
                color="#666"
              />
            </Pressable>
          </View>

          {/* Forgot password */}
          <TouchableOpacity onPress={() => Alert.alert('Forgot Password?', 'Feature not implemented')}>
            <Text style={styles.forgotPassword}>Forgot Password?</Text>
          </TouchableOpacity>

          {/* Continue Button */}
          <TouchableOpacity
            style={[styles.continueButton, loading && { opacity: 0.6 }]}
            onPress={handleLogin}
            disabled={loading}
          >
            <Text style={styles.continueButtonText}>
              {loading ? 'Logging in...' : 'Continue'}
            </Text>
          </TouchableOpacity>

          {/* Or text */}
          <Text style={styles.orText}>Or</Text>

          {/* Social Buttons */}
          <TouchableOpacity style={styles.socialButton}>
            <Icon name="google" size={20} color="#DB4437" style={{ marginRight: 8 }} />
            <Text style={styles.socialButtonText}>Sign in with Gmail</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.socialButton}>
            <Icon name="apple" size={20} color="#000" style={{ marginRight: 8 }} />
            <Text style={styles.socialButtonText}>Sign in with Apple</Text>
          </TouchableOpacity>

          {/* Sign Up */}
          <Text style={styles.signUpText}>
            Don’t have an account?{' '}
            <Text style={styles.signUpLink} onPress={() => navigation.navigate('SignUp')}>
              Sign up
            </Text>
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5a2e80', // Purple bg for the top part
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 30,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingBottom: 40,
  },
  welcomeText: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    lineHeight: 34,
  },
  underlineText: {
    textDecorationLine: 'underline',
  },
  subTitle: {
    color: '#fff',
    fontSize: 14,
    marginTop: 5,
  },
  globeIcon: {
    backgroundColor: 'rgba(123,82,157,0.7)', 
    padding: 10,
    borderRadius: 20,
    marginTop: 10,
  },
  curveShape: {
    flex: 1,
    backgroundColor: '#f3f0ef', 
    borderTopLeftRadius: 80,
    paddingHorizontal: 30,
    paddingTop: 25,
  },
  description: {
    textAlign: 'center',
    color: '#333',
    fontWeight: '600',
    marginBottom: 25,
    fontSize: 13,
  },
  form: {
    flex: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
    marginBottom: 15,
    paddingHorizontal: 15,
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: '100%',
    fontSize: 16,
    color: '#333',
  },
  eyeIcon: {
    padding: 5,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 20,
    color: '#aaa',
    fontSize: 12,
  },
  continueButton: {
    backgroundColor: '#9e4de0',
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 20,
  },
  continueButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 18,
  },
  orText: {
    textAlign: 'center',
    color: '#777',
    marginBottom: 15,
  },
  socialButton: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingVertical: 13,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  socialButtonText: {
    fontSize: 16,
    color: '#555',
  },
  signUpText: {
    marginTop: 10,
    textAlign: 'center',
    color: '#999',
  },
  signUpLink: {
    color: '#9e4de0',
    fontWeight: 'bold',
  },
  
});
