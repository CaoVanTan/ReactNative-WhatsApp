import { FlatList, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import MenuItem from '../components/MenuItem/MenuItem';
import Colors from '../constants/Colors';
import Avatar from '../components/Avatar/Avatar';
import { auth, logout } from '../firebase';

export default function Menu() {
    const user = auth.currentUser;
    const navigation = useNavigation();

    const data = [
        {
            id: 1,
            title: 'Thông tin cá nhân',
            icon: <Ionicons name="ios-person-circle" size={32} color="black" />,
        },
        {
            id: 2,
            title: 'Đăng xuất',
            icon: <MaterialCommunityIcons name="logout" size={32} color="black" />,
            onPress: async () => {
                await logout(auth);
                navigation.navigate('SignIn');
            },
        },
    ];

    return (
        <View style={styles.container}>
            <FlatList
                style={{ padding: 16 }}
                data={data}
                renderItem={({ item }) => (
                    <MenuItem title={item.title} onPress={item.onPress}>
                        {item.icon}
                    </MenuItem>
                )}
                ListHeaderComponent={() => (
                    <View style={styles.avatarContainer}>
                        <Avatar size={100} user={user} />
                        <Text style={styles.userName}>{user.displayName}</Text>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.light.background,
    },
    avatarContainer: {
        alignItems: 'center',
        marginBottom: 16,
    },
    userName: {
        marginTop: 8,
        fontSize: 24,
        fontWeight: 'bold',
    },
});
