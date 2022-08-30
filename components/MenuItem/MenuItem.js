import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';

const MenuItem = ({ title, children, onPress }) => {
    return (
        <TouchableOpacity style={styles.container} activeOpacity={0.7} onPress={onPress}>
            <View>{children}</View>
            <Text style={styles.title}>{title}</Text>
        </TouchableOpacity>
    );
};

export default MenuItem;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
    },
    title: {
        fontSize: 16,
        marginLeft: 12,
    },
});
