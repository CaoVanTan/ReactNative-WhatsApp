import { useContext, useEffect } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { collection, onSnapshot, query, where } from 'firebase/firestore';

import Colors from '../constants/Colors';
import ChatListItem from '../components/ChatListItem/ChatListItem';
import ChatRooms from '../data/ChatRooms';
import SearchBox from '../components/SearchBox/SearchBox';
import FriendListItem from '../components/FriendListItem/FriendListItem';
import FloatButton from '../components/FloatButton/FloatButton';
import Users from '../data/Users';
import Context from '../context/Context';
import { auth, db } from '../firebase';

export default function ChatsScreen({ navigation }) {
    const { currentUser } = auth;
    const { rooms, setRooms } = useContext(Context);
    const chatsQuery = query(collection(db, 'rooms'), where('participantsArray', 'array-contains', currentUser.email));

    useEffect(() => {
        const unsubscribe = onSnapshot(chatsQuery, (querySnapshot) => {
            const parsedChats = querySnapshot.docs
                .filter((doc) => doc.data().lastMessage)
                .map((doc) => ({
                    ...doc.data(),
                    id: doc.id,
                    userB: doc.data().participants.find((p) => p.email !== currentUser.email),
                }));

            setRooms(parsedChats);
        });

        return () => unsubscribe();
    }, []);

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
            <FloatButton />
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
