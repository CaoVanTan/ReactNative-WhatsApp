import { View, StyleSheet } from 'react-native';
import React from 'react';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';

import Colors from '../../constants/Colors';

const DefaultHeaderRight = () => {
    return (
        <View style={styles.container}>
            <Ionicons name="search" size={22} color="white" />
            <MaterialCommunityIcons name="dots-vertical" size={22} color="white" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 60,
        backgroundColor: Colors.light.tint,
    },
});

export default DefaultHeaderRight;
