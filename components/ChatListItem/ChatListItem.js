import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';

import styles from './style';

const ChatListItem = (props) => {
    const { chatRoom } = props;
    const navigation = useNavigation();

    const user = chatRoom.users[1];

    const handlePress = () => {
        navigation.navigate('ChatsRoom', {
            id: chatRoom.id,
            name: user.name,
        });
    };

    return (
        <TouchableOpacity style={styles.container} activeOpacity={0.8} onPress={handlePress}>
            <View style={styles.leftContainer}>
                <Image source={{ uri: user.imageUri }} style={styles.avatar} />

                <View style={styles.midContainer}>
                    <Text style={styles.userName}>{user.name}</Text>
                    <Text style={styles.lastMessage} numberOfLines={1}>
                        {chatRoom.lastMessage.content}
                    </Text>
                </View>
            </View>

            <View style={styles.rightContainer}>
                <Text style={styles.time}>
                    {moment().format('DD/MM/YYYY') === moment(chatRoom.lastMessage.createdAt).format('DD/MM/YYYY')
                        ? moment(chatRoom.lastMessage.createdAt).format('HH:mm')
                        : moment(chatRoom.lastMessage.createdAt).format('DD/MM/YYYY')}
                </Text>
            </View>
        </TouchableOpacity>
    );
};

export default ChatListItem;
