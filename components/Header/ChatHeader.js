import { Text, View, StyleSheet } from 'react-native';
import React from 'react';

import Colors from '../../constants/Colors';
import Avatar from '../Avatar/Avatar';
import { useRoute } from '@react-navigation/native';

const ChatHeader = () => {
    const route = useRoute();
    return (
        <View style={styles.container}>
            <View style={styles.leftContainer}>
                <Avatar size={36} user={route.params.user} />
                <Text style={styles.userName}>{route.params.user.contactName || route.params.user.displayName}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginLeft: -12,
        backgroundColor: Colors.light.background,
    },
    leftContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    userName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
        marginLeft: 12,
    },
    rightContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
});

export default ChatHeader;
