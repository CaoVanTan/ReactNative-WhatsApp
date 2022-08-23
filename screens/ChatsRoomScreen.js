import { StyleSheet, View, FlatList } from 'react-native';
import React from 'react';

import Chats from '../data/Chats';
import ChatMessage from '../components/ChatMessage/ChatMessage';
import InputBox from '../components/InputBox/InputBox';

const ChatsRoomScreen = ({ route }) => {
    const { id, name, avatar } = route.params;

    return (
        <View style={styles.container}>
            <FlatList data={Chats.messages} inverted renderItem={({ item }) => <ChatMessage message={item} />} />
            <InputBox />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { backgroundColor: '#fff', justifyContent: 'flex-end', height: '100%' },
});

export default ChatsRoomScreen;
