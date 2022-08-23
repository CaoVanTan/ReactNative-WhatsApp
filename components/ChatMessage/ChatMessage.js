import { View, Text, Image } from 'react-native';
import React from 'react';
import moment from 'moment';

import Chats from '../../data/Chats';
import styles from './style';

const ChatMessage = (props) => {
    const { message } = props;
    const user = Chats.users[1];

    const isMyMessage = () => {
        return message.user.id == 'u1';
    };

    return (
        <View style={[styles.container, isMyMessage() ? styles.rightContainer : styles.leftContainer]}>
            {!isMyMessage() && <Image source={{ uri: user.imageUri }} style={styles.avatar} />}
            <View style={[styles.messageBox, isMyMessage() ? styles.myMessageBox : styles.yourMessageBox]}>
                {!isMyMessage() && <Text style={styles.name}>{message.user.name}</Text>}
                <Text style={styles.message}>{message.content}</Text>
                <Text style={styles.time}>{moment(message.createdAt).fromNow()}</Text>
            </View>
        </View>
    );
};

export default ChatMessage;
