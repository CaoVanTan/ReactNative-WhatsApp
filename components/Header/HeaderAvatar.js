import { TouchableOpacity, StyleSheet, Image } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

import { auth } from '../../firebase';

import Colors from '../../constants/Colors';
import Avatar from '../Avatar/Avatar';

const HeaderAvatar = () => {
    const user = auth.currentUser;

    const navigation = useNavigation();

    const handlePress = () => {
        navigation.navigate('Menu');
    };

    return (
        <TouchableOpacity style={styles.container} activeOpacity={0.7} onPress={handlePress}>
            <Avatar size={40} user={user} />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 8,
        marginHorizontal: 8,
        backgroundColor: Colors.light.background,
    },
});

export default HeaderAvatar;
