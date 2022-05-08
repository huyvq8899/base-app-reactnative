import React from 'react';
import { useEffect, useState, useRef, useLayoutEffect, useContext } from 'react';
import { View, StyleSheet, Alert, ScrollView } from 'react-native';
import { useTheme, Avatar, Title, Caption, Paragraph, Drawer, Text, TouchableRipple, Switch } from 'react-native-paper';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { List, Checkbox } from 'react-native-paper';

import { v4 as uuid } from 'uuid';
import { API_URL } from '../../env';
export function DrawerContent(props) {
 
//////// Api + token device  //const API_URL = 'http:/192.168.1.172:45455/api/';
  const [expoPushToken, setExpoPushToken] = useState('');
  const [expanded, setExpanded] = React.useState(false);
  ////////
  const handlePress = () => setExpanded(!expanded);
  ///////////
  const [currentUser, setcurrentUser] = useState([]);

  const [userName, setuserName] = useState('');
  const [fullName, setfullName] = useState('');
  ///// Set Data To Put When Delete
  const [userId, setUserId] = useState('');
  const [tokenKey, setTokenKey] = useState('');
  const [avatar, setavatar] = useState('https://www.sibberhuuske.nl/wp-content/uploads/2016/10/default-avatar.png');
  useEffect(() => {
    async function getData() {
      try {
        const jsonValue = await AsyncStorage.getItem('@currentUser');
        const tokenLocal = await AsyncStorage.getItem('@tokenKey');
        const expoToken = await AsyncStorage.getItem('@expoToken');
       // console.log("🚀 ~ file: DrawerContent.js ~ line 1200 ~ getData ~ tokenLocal", tokenLocal)
        //console.log('🚀 ~ file: DrawerContent.js ~ line 51 ~ getData ~ jsonValue', jsonValue);
        if (jsonValue != null) {
          const userNamelocal = JSON.parse(jsonValue);
          setTokenKey(tokenLocal)
          setcurrentUser(userNamelocal);
          setuserName(userNamelocal.userName);
          setfullName(userNamelocal.fullName);
          setUserId(userNamelocal.userId);
          
          //setavatar('https://petrotimesgroup.com/upload/contact/4612petro-logo.png');
          if (userNamelocal.avatar != null && userNamelocal.avatar != '') setavatar(userNamelocal.avatar);
          // console.log('🚀 ~ file: DrawerContent.js ~ line 54 ~ getData ~ userNamelocal', userNamelocal);
        }
        if(expoToken!= null)
        {
          setExpoPushToken(expoToken)
        }
      } catch (error) { }
    }
    getData();
  }, [props]);


  const logOut = async () => {
    Alert.alert(
      'Đăng xuất',
      'Bạn có muốn đăng xuất không?',
      [
        {
          text: 'Không',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: async () => {         
            //console.log("🚀 ~ file: DrawerContent.js ~ line 1251 ~ onPress: ~ expoPushToken", expoPushToken)
            //await getExpoPushToken();
            await updateUserPlayerWhenLogout();
            await AsyncStorage.clear();
            setcurrentUser([]);
            setuserName('');
            setfullName('');
            //  NativeModules.DevSettings.reload();
            props.navigation.navigate('Login');

            //await AsyncStorage.removeItem('@currentUser');
          },
        },
      ],
      { cancelable: false },
    );
  };
  //

  /////// set focus
  const [isFocusedListItem, setIsFocusedListItem] = React.useState(false);
  const [isFocusedItemDonBanHangCongNghiep, setIsFocusedItemDonBanHangCongNghiep] = React.useState(false);
  /////////
    //////////// get token device to insert database send notification to app ReactNative
    async function registerForPushNotificationsAsync() {
      let tokenOfDevice;
      if (Constants.isDevice) {
        // const { status: existingStatus } = await Notifications.getPermissionsAsync();
        // let finalStatus = existingStatus;
        // if (existingStatus !== 'granted') {
        //   const { status } = await Notifications.requestPermissionsAsync();
        //   finalStatus = status;
        // }
        // if (finalStatus !== 'granted') {
        //   alert('Failed to get push tokenOfDevice for push notification!');
        //   return;
        // }
        tokenOfDevice = (await Notifications.getExpoPushTokenAsync()).data;
       // console.log('🚀 ~ file: Login.js ~ line 296 ~ registerForPushNotificationsAsync ~ token', tokenOfDevice);
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
    const updateUserPlayerWhenLogout = async () => {
      let dataToInsert = {
        playerID: expoPushToken,
        userID: userId,
        status: 0,
      };
      try {
        axios
          .put(`${API_URL}UserPlayer`, dataToInsert, {
            headers: {
              Authorization: `Bearer ${tokenKey}`,
              Accept: 'applicationr/json',
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Methods': 'PUT',
              'Access-Control-Allow-Headers': 'Content-Type, Authorization',
              'Access-Control-Allow-Credentials': 'true',
            },
          })
          .then((res) => {
          });
      } catch (error) {
      }
    };

  return (
    <View style={{ flex: 1, backgroundColor: '#f6f6f6f6' }}>
      <View style={styles.userInfoSection}>
        <View style={{ flexDirection: 'row', marginTop: 15 }}>
          <Avatar.Image
            source={{
              uri: avatar,
            }}
            size={50}
          />
          <View style={{ marginLeft: 15, flexDirection: 'column' }}>
            <Title style={styles.title}>{fullName}</Title>
            <Caption style={styles.caption}>@{userName}</Caption>
          </View>
        </View>
      </View>
      <DrawerContentScrollView {...props} showsVerticalScrollIndicator={false}>
        <View style={styles.drawerContent}>
          <Drawer.Section style={styles.drawerSection}>
            <List.Item
              title="Home"
              style={{
                backgroundColor: isFocusedItemDonBanHangCongNghiep ? '#BDBDBD' : 'transparent',
                display: 'flex',
                justifyContent: 'center',
              }}
              onPress={() => {
                setIsFocusedItemDonBanHangCongNghiep(!isFocusedItemDonBanHangCongNghiep);
                props.navigation.navigate('Home', { congnghiep: uuid() });
              }}
              titleStyle={styles.listAccodironTitle}
            />
          </Drawer.Section>
          {/* <Drawer.Section title="Khác">
            <List.Item
              title="Đổi mật khẩu"
              left={(props) => <List.Icon {...props} icon="pencil-outline" />}
              style={isFocusedListItem ? styles.listItemBackground : styles.listItemBackgroundActive}
              titleStyle={styles.listAccodironTitle}
              onPress={() => { }}
            />
          </Drawer.Section> */}
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <List.Item
          title="Đăng xuất"
          left={(props) => <List.Icon {...props} icon="exit-to-app" />}
          style={isFocusedListItem ? styles.listItemBackground : styles.listItemBackgroundActive}
          titleStyle={styles.listAccodironTitle}
          onPress={() => {
            logOut();
          }}
        />
        {/* <DrawerItem
          icon={({ color, size }) => <Icon name="exit-to-app" color={color} size={size} />}
          label="Đăng xuất"
          onPress={() => {
            logOut();
          }}
        /> */}
      </Drawer.Section>
    </View>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
    marginTop: -20,
  },
  userInfoSection: {
    paddingLeft: 20,
    marginTop: 45,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
    backgroundColor: 'transparent',
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  listAccodironBackground: {
    height: 35,
    backgroundColor: 'transparent',
    display: 'flex',
    justifyContent: 'center',
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 5,
  },
  listAccodironTitle: {
    textAlign: 'left',
    color: 'black',
  },
  listAccodironIcon: {
    marginLeft: -5,
    overflow: 'visible',
  },
  listItemBackgroundActive: {
    height: 35,
    backgroundColor: 'transparent',
    display: 'flex',
    justifyContent: 'center',
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 5,
  },
  listItemBackground: {
    height: 35,
    backgroundColor: '#BDBDBD',
    display: 'flex',
    justifyContent: 'center',
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 5,
  },
});
