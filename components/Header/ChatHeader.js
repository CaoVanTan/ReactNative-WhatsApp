import { Text, Image, View, StyleSheet } from 'react-native';
import React from 'react';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';

import Colors from '../../constants/Colors';
import Avatar from '../Avatar/Avatar';
import { useRoute } from '@react-navigation/native';

const ChatHeaderRight = () => {
    const route = useRoute();
    return (
        <View style={styles.container}>
            <View style={styles.leftContainer}>
                <Avatar size={36} user={route.params.user} />
                <Text style={styles.userName}>{route.params.user.contactName || route.params.user.displayName}</Text>
            </View>
            {/* <View style={styles.rightContainer}>
                <Ionicons name="call" size={22} color={Colors.light.tint} />
                <Ionicons name="videocam" size={22} color={Colors.light.tint} />
                <MaterialIcons name="info" size={22} color={Colors.light.tint} />
            </View> */}
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
        // flex: 1,
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
        // width: 120,
    },
});

export default ChatHeaderRight;
