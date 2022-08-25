import { View, StyleSheet } from 'react-native';
import React from 'react';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';

import Colors from '../../constants/Colors';

const ChatHeaderRight = () => {
    return (
        <View style={styles.container}>
            <Ionicons name="call" size={22} color={Colors.light.tint} />
            <Ionicons name="videocam" size={22} color={Colors.light.tint} />
            <MaterialIcons name="info" size={22} color={Colors.light.tint} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 120,
        backgroundColor: Colors.light.background,
    },
});

export default ChatHeaderRight;
