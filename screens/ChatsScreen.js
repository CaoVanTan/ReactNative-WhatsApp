import { FlatList, StyleSheet, View } from 'react-native';

import Colors from '../constants/Colors';
import ChatListItem from '../components/ChatListItem/ChatListItem';
import ChatRooms from '../data/ChatRooms';
import SearchBox from '../components/SearchBox/SearchBox';
import FriendListItem from '../components/FriendListItem/FriendListItem';
import Users from '../data/Users';

export default function ChatsScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <FlatList
                style={{ width: '100%' }}
                data={ChatRooms}
                renderItem={({ item }) => <ChatListItem chatRoom={item} />}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={() => (
                    <View>
                        <SearchBox onPress={() => navigation.navigate('Search')} />
                        <FlatList
                            data={Users}
                            horizontal
                            renderItem={({ item }) => (
                                <FriendListItem
                                    style={[
                                        item.id == '1' ? { marginLeft: 16 } : null,
                                        item.id == Users.length ? { marginRight: 16 } : null,
                                    ]}
                                    user={item}
                                />
                            )}
                            keyExtractor={(item) => item.id}
                        />
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.light.background,
    },
});
