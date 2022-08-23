import * as React from 'react';
import { View, Text, Image } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MaterialCommunityIcons, FontAwesome5, MaterialIcons } from '@expo/vector-icons';

import Colors from '../constants/Colors';
import TabNavigator from './TabNavigator';
import ChatsRoomScreen from '../screens/ChatsRoomScreen';
import ContactsScreen from '../screens/ContactsScreen';
import DefaultHeaderRight from '../components/HeaderRight/DefaultHeaderRight';
import ChatHeaderRight from '../components/HeaderRight/ChatHeaderRight';
import HeaderTitle from '../components/HeaderRight/HeaderTitle';

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: Colors.light.tint,
                },
                headerTintColor: Colors.light.background,
                headerShadowVisible: false,
            }}
        >
            <Stack.Screen
                name="Root"
                component={TabNavigator}
                options={{
                    title: 'WhatsApp',
                    headerRight: () => <DefaultHeaderRight />,
                }}
            />
            <Stack.Screen
                name="ChatsRoom"
                component={ChatsRoomScreen}
                options={({ route }) => ({
                    headerTitle: () => <HeaderTitle route={route} />,
                    headerRight: () => <ChatHeaderRight />,
                })}
            />
            <Stack.Screen
                name="Contacts"
                component={ContactsScreen}
                options={{
                    title: 'Contacts',
                    headerRight: () => <DefaultHeaderRight />,
                }}
            />
        </Stack.Navigator>
    );
};

export default RootNavigator;
