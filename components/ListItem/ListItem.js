import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import styles from './style';
import Avatar from '../Avatar/Avatar';

const ListItem = (props) => {
    const { type, lastMessage, user, time, room, image } = props;
    const navigation = useNavigation();

    const handlePress = () => {
        navigation.navigate('ChatsRoom', { user, room, image });
    };

    return (
        <TouchableOpacity style={styles.container} activeOpacity={0.8} onPress={handlePress}>
            <View style={styles.leftContainer}>
                <Avatar user={user} size={type === 'contacts' ? 42 : 56} />

                <View style={styles.midContainer}>
                    <Text style={styles.userName}>{user.contactName || user.displayName}</Text>
                    {lastMessage && (
                        <Text style={styles.lastMessage} numberOfLines={1}>
                            {lastMessage}
                        </Text>
                    )}
                </View>
            </View>

            <View style={styles.rightContainer}>
                {time && (
                    <View style={styles.timeContainer}>
                        <Text style={styles.time}>{new Date(time.seconds * 1000).toLocaleDateString()}</Text>
                    </View>
                )}
                {/* <Text style={styles.time}>
                    {moment().format('DD/MM/YYYY') === moment(chatRoom.lastMessage.createdAt).format('DD/MM/YYYY')
                        ? moment(chatRoom.lastMessage.createdAt).format('HH:mm')
                        : moment(chatRoom.lastMessage.createdAt).format('DD/MM/YYYY')}
                </Text> */}
            </View>
        </TouchableOpacity>
    );
};

export default ListItem;
