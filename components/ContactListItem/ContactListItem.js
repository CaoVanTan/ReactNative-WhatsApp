import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import styles from './style';

const ContactListItem = (props) => {
    const { user } = props;
    const navigation = useNavigation();

    const handlePress = () => {
        // navigate to chat room of user
    };

    return (
        <TouchableOpacity style={styles.container} activeOpacity={0.8} onPress={handlePress}>
            <Image source={{ uri: user.imageUri }} style={styles.avatar} />

            <View style={styles.rightContainer}>
                <Text style={styles.userName}>{user.name}</Text>
                {user.status && (
                    <Text style={styles.status} numberOfLines={1}>
                        {user.status}
                    </Text>
                )}
            </View>
        </TouchableOpacity>
    );
};

export default ContactListItem;
