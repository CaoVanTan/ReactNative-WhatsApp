import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Colors from '../constants/Colors';
import TabNavigator from './TabNavigator';
import ChatsRoom from '../screens/ChatsRoom';
import Contacts from '../screens/Contacts';
import Search from '../screens/Search';
import HeaderRight from '../components/Header/HeaderRight';
import ChatHeader from '../components/Header/ChatHeader';
import HeaderSearch from '../components/Header/HeaderSearch';
import Profile from '../screens/Profile';
import Menu from '../screens/Menu';
import SignIn from '../screens/SignIn';

const Stack = createNativeStackNavigator();

const RootNavigator = ({ currentUser }) => {
    return (
        <Stack.Navigator>
            {!currentUser.displayName && (
                <Stack.Screen
                    name="Profile"
                    component={Profile}
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
                component={ChatsRoom}
                options={{
                    headerTitle: (props) => <ChatHeader {...props} />,
                    headerTintColor: Colors.light.tint,
                }}
            />
            <Stack.Screen
                name="Menu"
                component={Menu}
                options={{
                    title: 'Tôi',
                }}
            />
            <Stack.Screen
                name="Contacts"
                component={Contacts}
                options={{
                    title: 'Liên hệ',
                    headerRight: () => <HeaderRight />,
                }}
            />
            <Stack.Screen
                name="Search"
                component={Search}
                options={{
                    headerTitle: () => <HeaderSearch />,
                }}
            />
            <Stack.Screen
                name="SignIn"
                component={SignIn}
                options={{
                    headerShown: false,
                }}
            />
        </Stack.Navigator>
    );
};

export default RootNavigator;
