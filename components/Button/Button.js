import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import styles from './style';
import Colors from '../../constants/Colors';

const Button = ({ title, onPress, disabled = true }) => {
    return (
        <TouchableOpacity
            style={[styles.container, disabled ? { backgroundColor: Colors.light.backgroundIcon } : null]}
            activeOpacity={disabled ? 1 : 0.6}
            onPress={onPress}
            disabled={disabled}
        >
            <Text style={[styles.text, disabled ? { color: Colors.light.tabIconDefault } : null]}>{title}</Text>
        </TouchableOpacity>
    );
};

export default Button;
