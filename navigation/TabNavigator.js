import * as React from 'react';
import { View } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Fontisto } from '@expo/vector-icons';

import Colors from '../constants/Colors';
import ChatsScreen from '../screens/ChatsScreen';
import Camera from '../screens/Camera';
import Status from '../screens/Status';
import Calls from '../screens/Status';

const Tab = createMaterialTopTabNavigator();

const TabNavigator = () => {
    return (
        <Tab.Navigator
            initialRouteName="Chats"
            screenOptions={{
                tabBarActiveTintColor: Colors.light.background,
                tabBarStyle: {
                    backgroundColor: Colors.light.tint,
                },
                tabBarIndicatorStyle: {
                    backgroundColor: Colors.light.background,
                    height: 3,
                },
                tabBarLabelStyle: {
                    fontWeight: 'bold',
                },
            }}
        >
            <Tab.Screen
                name="Camera"
                component={Camera}
                options={{
                    tabBarIcon: ({ color }) => <Fontisto name="camera" size={19} color={color} />,
                    tabBarIconStyle: {
                        justifyContent: 'center',
                        alignContent: 'center',
                    },
                    tabBarLabel: () => null,
                }}
            />
            <Tab.Screen name="Chats" component={ChatsScreen} options={{}} />
            <Tab.Screen name="Status" component={Status} options={{}} />
            <Tab.Screen name="Calls" component={Calls} options={{}} />
        </Tab.Navigator>
    );
};

export default TabNavigator;
