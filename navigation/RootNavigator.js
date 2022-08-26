import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Colors from '../constants/Colors';
import TabNavigator from './TabNavigator';
import ChatsRoomScreen from '../screens/ChatsRoomScreen';
import ContactsScreen from '../screens/ContactsScreen';
import SearchScreen from '../screens/SearchScreen';
import HeaderRight from '../components/Header/HeaderRight';
import ChatHeaderRight from '../components/Header/ChatHeaderRight';
import HeaderTitle from '../components/Header/HeaderTitle';
import HeaderSearch from '../components/Header/HeaderSearch';
import ProfileScreen from '../screens/ProfileScreen';
import PersonalInfoScreen from '../screens/PersonalInfoScreen';

const Stack = createNativeStackNavigator();

const RootNavigator = ({ currentUser }) => {
    return (
        <Stack.Navigator>
            {!currentUser.displayName && (
                <Stack.Screen
                    name="Profile"
                    component={ProfileScreen}
                    options={{
                        headerShown: false,
                    }}
                />
            )}
            <Stack.Screen
                name="Root"
                component={TabNavigator}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="ChatsRoom"
                component={ChatsRoomScreen}
                options={({ route }) => ({
                    headerTitle: () => <HeaderTitle route={route} />,
                    headerRight: () => <ChatHeaderRight />,
                    headerTintColor: Colors.light.tint,
                })}
            />
            <Stack.Screen
                name="PersonalInfo"
                component={PersonalInfoScreen}
                options={{
                    title: 'Tôi',
                }}
            />
            <Stack.Screen
                name="Contacts"
                component={ContactsScreen}
                options={{
                    title: 'Liên hệ',
                    headerRight: () => <HeaderRight />,
                }}
            />
            <Stack.Screen
                name="Search"
                component={SearchScreen}
                options={{
                    headerTitle: () => <HeaderSearch />,
                }}
            />
        </Stack.Navigator>
    );
};

export default RootNavigator;
