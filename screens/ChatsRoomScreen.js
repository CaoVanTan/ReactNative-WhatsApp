import { StyleSheet, View, FlatList } from 'react-native';
import React from 'react';

import Chats from '../data/Chats';
import ChatMessage from '../components/ChatMessage/ChatMessage';
import ChatBox from '../components/ChatBox/ChatBox';

const ChatsRoomScreen = ({ route }) => {
    const { id, name, avatar } = route.params;

    return (
        <View style={styles.container}>
            <FlatList data={Chats.messages} inverted renderItem={({ item }) => <ChatMessage message={item} />} />
            <ChatBox />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { backgroundColor: '#fff', justifyContent: 'flex-end', height: '100%' },
});

export default ChatsRoomScreen;
