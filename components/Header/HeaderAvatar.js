import { View, StyleSheet, Image } from 'react-native';
import React from 'react';
import { auth } from '../../firebase';

import Colors from '../../constants/Colors';

const HeaderAvatar = () => {
    const user = auth.currentUser;

    return (
        <View style={styles.container}>
            <Image
                style={styles.avatar}
                source={{
                    uri: user.photoURL,
                }}
                resizeMode="contain"
            />
        </View>
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
