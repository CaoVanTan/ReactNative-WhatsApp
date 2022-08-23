import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import styles from './style';

export default function FloatButton() {
    const navigation = useNavigation();

    const onPress = () => navigation.navigate('Contacts');

    return (
        <TouchableOpacity style={styles.container} activeOpacity={0.8} onPress={onPress}>
            <Entypo name="new-message" size={24} color="white" />
        </TouchableOpacity>
    );
}
