import { View, Text, Image, StyleSheet } from 'react-native';
import React from 'react';

const HeaderTitle = ({ route }) => {
    return (
        <View style={styles.container}>
            <Image style={styles.avatar} source={{ uri: route.params.avatar }} />
            <Text style={styles.userName}>{route.params.name}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: -20,
    },
    avatar: {
        width: 36,
        height: 36,
        borderRadius: 50,
        marginRight: 12,
    },
    userName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
    },
});

export default HeaderTitle;
