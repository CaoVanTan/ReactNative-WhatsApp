import { View, StyleSheet, Text, Image } from 'react-native';
import React from 'react';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';

import Colors from '../../constants/Colors';

const HeaderAvatar = () => {
    return (
        <View style={styles.container}>
            <Image
                style={styles.avatar}
                source={{
                    uri: 'https://scontent.fhan12-1.fna.fbcdn.net/v/t1.30497-1/143086968_2856368904622192_1959732218791162458_n.png?stp=cp0_dst-png_p40x40&_nc_cat=1&ccb=1-7&_nc_sid=7206a8&_nc_ohc=vVhbKhjuOB0AX-9XELr&_nc_ht=scontent.fhan12-1.fna&oh=00_AT8v7cop4clEiIF7sJIxpoifS8_Z75nbmlutanLFvq9cEA&oe=63256F78',
                }}
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
        width: 36,
        height: 36,
        marginHorizontal: 8,
        borderRadius: 20,
    },
});

export default HeaderAvatar;
