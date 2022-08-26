import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import styles from './style';
import Avatar from '../Avatar/Avatar';

const ContactListItem = (props) => {
    const { type, description, user, time, room, image } = props;
    const navigation = useNavigation();

    const handlePress = () => {
        navigation.navigate('ChatsRoom', { user, room, image });
    };

    return (
        <TouchableOpacity style={styles.container} activeOpacity={0.8} onPress={handlePress}>
            <Avatar user={user} size={type === 'contacts' ? 42 : 65} />

            <View style={styles.rightContainer}>
                <Text style={styles.userName}>{user.contactName || user.displayName}</Text>
                {time && (
                    <View style={styles.timeContainer}>
                        <Text style={styles.time}>{new Date(time.seconds * 1000).toLocaleDateString()}</Text>
                    </View>
                )}
                {description && (
                    <Text style={styles.description} numberOfLines={1}>
                        {description}
                    </Text>
                )}
            </View>
        </TouchableOpacity>
    );
};

export default ContactListItem;
