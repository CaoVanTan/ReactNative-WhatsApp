import { TouchableOpacity, StyleSheet, Image } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

import { auth } from '../../firebase';

import Colors from '../../constants/Colors';

const HeaderAvatar = () => {
    const user = auth.currentUser;

    const navigation = useNavigation();

    const handlePress = () => {
        navigation.navigate('PersonalInfo');
    };

    return (
        <TouchableOpacity style={styles.container} activeOpacity={0.7} onPress={handlePress}>
            <Image
                style={styles.avatar}
                source={{
                    uri: user.photoURL,
                }}
                resizeMode="contain"
            />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 8,
        backgroundColor: Colors.light.background,
    },
    avatar: {
        width: 40,
        height: 40,
        marginHorizontal: 8,
        borderRadius: 20,
    },
});

export default HeaderAvatar;
