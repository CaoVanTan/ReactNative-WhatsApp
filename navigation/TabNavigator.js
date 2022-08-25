import * as React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, FontAwesome5, FontAwesome } from '@expo/vector-icons';

import Colors from '../constants/Colors';
import ChatsScreen from '../screens/ChatsScreen';
import PhoneBook from '../screens/PhoneBook';
import Status from '../screens/Status';
import Calls from '../screens/Status';
import HeaderRight from '../components/Header/HeaderRight';
import HeaderAvatar from '../components/Header/HeaderAvatar';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    return (
        <Tab.Navigator
            initialRouteName="Chats"
            screenOptions={({ route }) => ({
                tabBarStyle: {
                    height: 60,
                },
                tabBarActiveTintColor: Colors.light.tabIconSelected,
                tabBarLabelStyle: {
                    fontSize: 14,
                    marginBottom: 8,
                },
                tabBarIconStyle: {
                    marginTop: 8,
                },
                tabBarIcon: ({ focused }) => {
                    let iconName;
                    let colorIcon = focused ? Colors.light.tabIconSelected : Colors.light.tabIconDefault;
                    if (route.name === 'Chats') {
                        iconName = require('../assets/tab-icons/message.png');
                    } else if (route.name === 'Calls') {
                        iconName = require('../assets/tab-icons/video.png');
                    } else if (route.name === 'PhoneBook') {
                        iconName = require('../assets/tab-icons/people.png');
                    } else if (route.name === 'Status') {
                        iconName = require('../assets/tab-icons/video.png');
                    }
                    return <Image source={iconName} style={{ width: 24, height: 24 }} tintColor={colorIcon} />;
                },
            })}
        >
            <Tab.Screen
                name="Chats"
                component={ChatsScreen}
                options={{
                    title: 'Đoạn chat',
                    headerTitleStyle: {
                        marginLeft: -16,
                    },
                    headerLeft: () => <HeaderAvatar />,
                    headerRight: () => (
                        <HeaderRight>
                            <View style={styles.item}>
                                <FontAwesome5 name="camera" size={18} color="black" />
                            </View>
                            <View style={styles.item}>
                                <Ionicons name="pencil" size={18} color="black" />
                            </View>
                        </HeaderRight>
                    ),
                }}
            />
            <Tab.Screen
                name="Calls"
                component={Calls}
                options={{
                    title: 'Cuộc gọi',
                    headerTitleStyle: {
                        marginLeft: -16,
                    },
                    headerLeft: () => <HeaderAvatar />,
                    headerRight: () => (
                        <HeaderRight>
                            <View style={styles.item}>
                                <Ionicons name="call" size={18} color="black" />
                            </View>
                            <View style={styles.item}>
                                <Ionicons name="videocam" size={18} color="black" />
                            </View>
                        </HeaderRight>
                    ),
                }}
            />
            <Tab.Screen
                name="PhoneBook"
                component={PhoneBook}
                options={{
                    title: 'Danh bạ',
                    headerTitleStyle: {
                        marginLeft: -16,
                    },
                    headerLeft: () => <HeaderAvatar />,
                    headerRight: () => (
                        <HeaderRight>
                            <View style={styles.item}>
                                <FontAwesome name="address-book" size={18} color="black" />
                            </View>
                        </HeaderRight>
                    ),
                }}
            />
            <Tab.Screen
                name="Status"
                component={Status}
                options={{
                    title: 'Tin',
                    headerTitleStyle: {
                        marginLeft: -16,
                    },
                    headerLeft: () => <HeaderAvatar />,
                }}
            />
        </Tab.Navigator>
    );
};

const styles = StyleSheet.create({
    item: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 36,
        height: 36,
        marginHorizontal: 8,
        borderRadius: 20,
        backgroundColor: Colors.light.backgroundIcon,
    },
});

export default TabNavigator;
