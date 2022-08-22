import { View, Text, FlatList } from 'react-native';
import React from 'react';

import Chats from '../data/Chats';
import ChatMessage from '../components/ChatMessage/ChatMessage';

const ChatsRoomScreen = ({ route }) => {
    const { id, name } = route.params;

    // console.log(id);

    return (
        <View>
            <FlatList data={Chats.messages} renderItem={({ item }) => <ChatMessage message={item} />} />
        </View>
    );
};

export default ChatsRoomScreen;
