import { FlatList, StyleSheet, View } from 'react-native';

import ChatListItem from '../components/ChatListItem/ChatListItem';
import ChatRooms from '../data/ChatRooms';
import FloatButton from '../components/FloatButton/FloatButton';

export default function ChatsScreen() {
    return (
        <View style={styles.container}>
            <FlatList
                style={{ width: '100%' }}
                data={ChatRooms}
                renderItem={({ item }) => <ChatListItem chatRoom={item} />}
                keyExtractor={(item) => item.id}
            />

            <FloatButton />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
