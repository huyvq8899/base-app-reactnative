import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Animated, SafeAreaView, Image, TouchableOpacity, View, StyleSheet, Text } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';



export default function Home({ navigation }) {
  const Drawer = createDrawerNavigator();
  const [currentTab, setCurrentTab] = React.useState('Home');
  // To get the curretn Status of menu ...
  const [showMenu, setShowMenu] = React.useState(false);

  // Animated Properties...

  const offsetValue = React.useRef(new Animated.Value(0)).current;
  // Scale Intially must be One...
  const scaleValue = React.useRef(new Animated.Value(1)).current;
  const closeButtonOffset = React.useRef(new Animated.Value(0)).current;
  const [count, setCount] = useState(0);
  const [listdonhang, setlistdonhang] = useState([]);
  const dispatch = useDispatch();
  const loadDL = async () => {};
  useEffect(() => {
    async function getData() {}
    getData();
  }, [count]);
  //color

  return (
    <SafeAreaView style={styles.container}>
      {/* <Animated.View
        style={{
          flexGrow: 1,
          backgroundColor: 'white',
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          paddingHorizontal: 15,
          paddingVertical: 20,
          borderRadius: showMenu ? 15 : 0,
          // Transforming View...
          transform: [{ scale: scaleValue }, { translateX: offsetValue }],
        }}
      >
        {
          // Menu Button...
        }

        <Animated.View
          style={{
            transform: [
              {
                translateY: closeButtonOffset,
              },
            ],
          }}
        >
          <View style={{ display: 'flex', flexDirection: 'row' }}>
            <TouchableOpacity
              onPress={() => navigation.openDrawer()}
              style={{ backgroundColor: 'white', marginTop: 15, width: '20%' }}
            >
              <Icon name="menu-open" color="#000000" size={30} />
            </TouchableOpacity>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                color: 'black',
                marginTop: 17,
                width: '60%',
                textAlign: 'center',
              }}
            >
              {currentTab}
            </Text>
            <TouchableOpacity
              style={{ backgroundColor: 'white', marginTop: -50, width: '20%', justifyContent: 'flex-end' }}
              onPress={() => {
                setCount(count + 1);
              }}
            >
              <Icon name="bell-outline" color="#000000" size={30} style={{ textAlign: 'right' }} />
            </TouchableOpacity>
          </View>
        </Animated.View>
      </Animated.View> */}
    </SafeAreaView>
  );
}
// For multiple Buttons...
//
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
});
