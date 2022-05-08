import { StyleSheet, Alert } from 'react-native';

import React, { useEffect, useState} from 'react';
///////Import to call API
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';

import * as LocalAuthentication from 'expo-local-authentication';
import { login } from './../../redux/actions/loginActions';
//icon
import { Octicons } from '@expo/vector-icons';
import {Ionicons } from '@expo/vector-icons';
//formik
import { Formik } from 'formik';
// keyboard avoiding view
import KeyboardAvoidingWrapper from '../../components/KeyboardAvoidingWrapper';
import { API_URL } from '../../env';
//middleware
import { storeuse } from './../../redux/store';
import Spinner from 'react-native-loading-spinner-overlay';

import {
  StyledContainer,
  InnerContainer,
  PageLogo,
  PageTitle,
  SubTitle,
  StyledFormArea,
  LeftIcon,
  StyledInputLabel,
  StyledTextInput,
  RightIcon,
  StyledButton,
  ButtonText,
  Colors,
} from '../../components/styles';
import { View } from 'react-native';
////////////// save localstorage
export const getLocalStorage = async (rs) => {
  try {
    return await AsyncStorage.getItem(rs);
  } catch (e) {
    // read error
  }
};
export const getStatus = async () => {
  try {
    a = await AsyncStorage.getItem('@status');
    return a;
  } catch (e) {
    // read error
  }
};
export const getCurrentUser = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('@currentUser');
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // read error
  }
  //   console.warn(a);
};
const setStringValue = async (value) => {
  try {
    // await AsyncStorage.setItem('@userName', value.userName);
    await AsyncStorage.setItem('@userId', value.userId);
    await AsyncStorage.setItem('@tokenKey', value.tokenKey);
    await AsyncStorage.setItem('@xeId', value.xeId);
    await AsyncStorage.setItem('@roleId', value.model.roleId);
    await AsyncStorage.setItem('@roleName', value.roleName);
  } catch (e) {
    // save error
  }
  //   let a = await getLocalStorage('@userId');
  //   console.warn(a);
};
const setObjectValue = async (value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem('@currentUser', jsonValue);
  } catch (e) {
    // save error
  }
  // let a = await getCurrentUser();
  // console.log('🚀 ~ file: Login.js ~ line 86 ~ setObjectValue ~ a', a);
};
const setReturn = async (value) => {
  try {
    await AsyncStorage.setItem('@status', `${value}`);
  } catch (e) { }
  // let a = await getStatus();
  // console.warn(a);
};
export const clearAll = async () => {
  try {
    await AsyncStorage.clear();
  } catch (e) {
    // clear error
  }
};
const removeValue = async () => {
  try {
    await AsyncStorage.removeItem('@status');
  } catch (e) {
    // remove error
  }
};
/////////////
export default function Login(props) {


  //const API_URL = 'http:/192.168.1.172:45455/api/';
  const [expoPushToken, setExpoPushToken] = useState('');
  //const context = useContext(UserContext);
  const { brand, darkLight, darkIcon } = Colors;
  const [userName, setUserName] = useState('admin');
  const [password, setPassword] = useState('123');
  const [loading, setLoading] = useState(false);
  const startLoading = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  };
  const { user, error } = useSelector((state) => state.userReduce);
  const dispatch = useDispatch();

  useEffect(() => {
    ///// get token device to push notifications
    registerForPushNotificationsAsync().then(async (token) => {
      setExpoPushToken(token);
      await AsyncStorage.setItem('@expoToken', expoPushToken);
    });
    //console.log("🚀 ~ file: Login.js ~ line 119 ~ Login ~ props", props)
    //getUserInfo();
  });
  useEffect(() => {
    getUserInfo();
  },[]);
  const getUserInfo = async () => {
    try {
      const userNamelocal = await AsyncStorage.getItem('@userName');
      //const passwordlocal = await AsyncStorage.getItem('@roleId');
      const userIdlocal = await AsyncStorage.getItem('@userId');
      const tokenlocal = await AsyncStorage.getItem('@tokenKey');
      if (userNamelocal != null) {
        // allows you to use FaceID and TouchID (iOS) or
        // the Biometric Prompt (Android) to authenticate the user with a face or fingerprint scan
        let biometricAuth = await handleBiometricAuth();
        if (biometricAuth != null && biometricAuth.success) {
          // let result = {
          //   tokenKey: tokenlocal,
          //   userId: userIdlocal
          // };
          // if (tokenlocal != null && tokenlocal != "") {
          //   insertTokenNotifications(result);
          // }
          props.navigation.navigate('DonBanHangCongNghiep', { congnghiep: 'OK' });
        }
      }
    } catch (e) {
      //console.log(e);
    }
  };

  const handleBiometricAuth = async () => {
    // Check if hardware supports biometrics
    const isBiometricAvailable = await LocalAuthentication.hasHardwareAsync();

    // Check Biometrics types available (Fingerprint, Facial recognition, Iris recognition)
    let supportedBiometrics;
    if (isBiometricAvailable) {
      supportedBiometrics = await LocalAuthentication.supportedAuthenticationTypesAsync();
    }

    // Check Biometrics are saved locally in user's device
    const savedBiometrics = await LocalAuthentication.isEnrolledAsync();

    // Authenticate use with Biometrics (Fingerprint, Facial recognition, Iris recognition)
    let biometricAuth;
    if (supportedBiometrics && savedBiometrics) {
      biometricAuth = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Đăng nhập sinh trắc học',
        cancelLabel: 'Hủy bỏ',
        disableDeviceFallback: true,
      });
    }

    // Log the user in on auth
    return biometricAuth;
  };

  const [inserTokenServer, setinserTokenServer] = React.useState(true);
  function onLogin(userName, password) {
    setLoading(true);
    setinserTokenServer(true);
    storeuse.dispatch(login(userName, password));
    storeuse.subscribe(() => {
      const result = storeuse.getState().userReduce.user;
      const status = result.result;
      if (status === 1) {
        //context.settokenKey(result.userId);
        //console.log("🚀 ~ file: Login.js ~ line 217 ~ storeuse.subscribe ~ result", result)
        setStringValue(result);
        setObjectValue(result.model);
        setReturn(status);
        if (inserTokenServer) {
        
          //console.log("🚀 ~ file: Login.js ~ line 228 ~ storeuse.subscribe ~ inserTokenServer", inserTokenServer);
          insertTokenNotifications(result);
          setinserTokenServer(false);
        }

      } else setReturn(status);
      if (status == 1) {
        //console.log('🚀 ~ file: Login.js ~ line 173 ~ storeuse.subscribe ~ result', result.model.roleId);
        if (result.model.roleId == 'GNLX')
          props.navigation.navigate('DonBanHangCongNghiep', { congnghiep: 'OK' });
        else {
          Alert.alert(
            'Thông báo',
            'Bạn không phải lái xe',
            [
              {
                text: 'OK',
                onPress: async () => {
                  await AsyncStorage.clear();
                },
              },
            ],
          );
        }
        setLoading(false);
      } else if (status == 2) {
        Alert.alert(
          'Thông báo',
          'Tài khoản bị khóa',
          [
            {
              text: 'OK',
              onPress: () => {
                setLoading(false);
              },
            },
          ],
        );
      } else if (status == -1) {
        Alert.alert(
          'Thông báo',
          'Tài khoản không tồn tại',
          [
            {
              text: 'OK',
              onPress: () => {
                setLoading(false);
              },
            },
          ],
        );
      } else if (status == 0) {
        Alert.alert(
          'Thông báo',
          'Sai mật khẩu',
          [
            {
              text: 'OK',
              onPress: () => {
                setLoading(false);
              },
            },
          ],
        );
      }
    });
  }
  const [hidePassword, setHidePassword] = useState(true);
  const insertTokenNotifications = async (value) => {
    const token = value.tokenKey;
    const userIdLX = value.userId;
    let dataToInsert = {
      userPlayerID: '',
      playerID: expoPushToken,
      userID: userIdLX,
      status: 1,
      role: '',
    };
    axios
      .post(`${API_URL}UserPlayer`, dataToInsert, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'applicationr/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
          'Access-Control-Allow-Credentials': 'true',
        },
      })
      .then((res) => { });
  };
  //////////// get token device to insert database send notification to app ReactNative
  async function registerForPushNotificationsAsync() {
    let experienceId = undefined;
    experienceId = '@manhphan/petrotimes';
    if (Constants.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        // alert('Failed to get push tokenOfDevice for push notification!');
        return;
      }
      tokenOfDevice = (await Notifications.getExpoPushTokenAsync({ experienceId })).data;
      // tokenOfDevice = (await Notifications.getExpoPushTokenAsync()).data;
    } else {
      alert('Must use physical device for Push Notifications');
    }

    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
    return tokenOfDevice;
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'space-around',
      alignItems: 'center',
    },
  });
  const MyTextInput = ({ label, icon, isPassword, setHidePassword, hidePassword, ...props }) => {
    return (
      <View>
        <LeftIcon>
          <Octicons name={icon} size={30} color={darkIcon} />
        </LeftIcon>
        <StyledInputLabel>{label}</StyledInputLabel>
        <StyledTextInput {...props} />
        {isPassword && (
          <RightIcon onPress={() => setHidePassword(!hidePassword)}>
            <Ionicons name={hidePassword ? 'md-eye-off' : 'md-eye'} size={30} color={darkIcon} />
          </RightIcon>
        )}
      </View>
    );
  };
  return (
    <KeyboardAvoidingWrapper>
      <StyledContainer>
        <InnerContainer>
          <Spinner
            //visibility of Overlay Loading Spinner
            visible={loading}
            //Text with the Spinner
            textContent={'Đang đăng nhập...'}
            //Text style of the Spinner Text
            textStyle={{ color: '#FFF' }}
          />
          <PageLogo style={{ width: 200 }} resizeMode="contain" source={require('./../../assets/petro-logo.png')} />
          {/* <PageTitle>Xin ch�o</PageTitle> */}
          {/* <SubTitle>Account Login</SubTitle> */}
          <Formik
            initialValues={{ userName: '', password: '' }}
            onSubmit={async (values) => {
              //console.log("🚀 ~ file: Login.js ~ line 305 ~ onSubmit={ ~ values", values)
              onLogin(values.userName, values.password);
              await AsyncStorage.setItem('@userName', values.userName);
              await AsyncStorage.setItem('@password', values.password);
            }}
          >
            {({ handleChange, handleBlur, handleSubmit, values }) => (
              <StyledFormArea>
                <MyTextInput
                  label="UserName"
                  icon="person"
                  placeholder="Tên đăng nhập"
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange('userName')}
                  onBlur={handleBlur('userName')}
                  value={values.userName}
                />
                <MyTextInput
                  label="Password"
                  icon="lock"
                  placeholder="* * * * * *"
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  secureTextEntry={hidePassword}
                  isPassword={true}
                  hidePassword={hidePassword}
                  setHidePassword={setHidePassword}
                />
                <StyledButton onPress={handleSubmit}>
                  <ButtonText>Đăng nhập</ButtonText>
                </StyledButton>
              </StyledFormArea>
            )}
          </Formik>
        </InnerContainer>
      </StyledContainer>
    </KeyboardAvoidingWrapper>
  );
}
