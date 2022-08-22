import * as React from 'react';
import { View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons, MaterialCommunityIcons, FontAwesome5, MaterialIcons } from '@expo/vector-icons';

import Colors from '../constants/Colors';
import TabNavigator from './TabNavigator';
import ChatsRoomScreen from '../screens/ChatsRoomScreen';

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
                    headerRight: () => (
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                width: 60,
                                backgroundColor: Colors.light.tint,
                            }}
                        >
                            <Ionicons name="search" size={22} color="white" />
                            <MaterialCommunityIcons name="dots-vertical" size={22} color="white" />
                        </View>
                    ),
                }}
            />
            <Stack.Screen
                name="ChatsRoom"
                component={ChatsRoomScreen}
                options={({ route }) => ({
                    title: route.params.name,
                    headerRight: () => (
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                width: 120,
                                backgroundColor: Colors.light.tint,
                            }}
                        >
                            <MaterialIcons name="call" size={22} color="white" />
                            <FontAwesome5 name="video" size={22} color="white" />
                            <MaterialCommunityIcons name="dots-vertical" size={22} color="white" />
                        </View>
                    ),
                })}
            />
        </Stack.Navigator>
    );
};

export default RootNavigator;
