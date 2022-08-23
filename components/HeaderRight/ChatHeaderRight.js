import { View, StyleSheet } from 'react-native';
import React from 'react';
import { MaterialCommunityIcons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';

import Colors from '../../constants/Colors';

const ChatHeaderRight = () => {
    return (
        <View style={styles.container}>
            <MaterialIcons name="call" size={22} color="white" />
            <FontAwesome5 name="video" size={22} color="white" />
            <MaterialCommunityIcons name="dots-vertical" size={22} color="white" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 120,
        backgroundColor: Colors.light.tint,
    },
});

export default ChatHeaderRight;
