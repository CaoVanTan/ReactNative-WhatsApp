import { Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';

import styles from './style';

const SearchBox = ({ onPress }) => {
    return (
        <TouchableOpacity style={styles.container} activeOpacity={0.8} onPress={onPress}>
            <MaterialIcons name="search" size={22} color="#a1a1a1" />
            <Text style={styles.text}>Tìm kiếm</Text>
        </TouchableOpacity>
    );
};

export default SearchBox;
