import { View, Text, Image } from 'react-native';
import React from 'react';

import styles from './style';

const FriendListItem = (props) => {
    const { user, style } = props;
    return (
        <View style={[styles.container, style]}>
            <Image style={styles.avatar} source={{ uri: user.imageUri }} />
            <Text style={styles.userName}>{user.name}</Text>
        </View>
    );
};

export default FriendListItem;
