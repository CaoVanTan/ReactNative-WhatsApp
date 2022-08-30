import { useContext, useEffect } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { collection, onSnapshot, query, where } from 'firebase/firestore';

import Colors from '../constants/Colors';
import SearchBox from '../components/SearchBox/SearchBox';
import FriendListItem from '../components/FriendListItem/FriendListItem';
import FloatButton from '../components/FloatButton/FloatButton';
import Users from '../data/Users';
import Context from '../context/Context';
import { auth, db } from '../firebase';
import ListItem from '../components/ListItem/ListItem';
import userContact from '../hook/useHook';

export default function Chats({ navigation }) {
    const { currentUser } = auth;
    const { rooms, setRooms, setUnfilteredRooms } = useContext(Context);
    const contacts = userContact();
    const chatsQuery = query(collection(db, 'rooms'), where('participantsArray', 'array-contains', currentUser.email));

    useEffect(() => {
        const unsubscribe = onSnapshot(chatsQuery, (querySnapshot) => {
            const parsedChats = querySnapshot.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
                userB: doc.data().participants.find((p) => p.email !== currentUser.email),
            }));

            setUnfilteredRooms(parsedChats);
            setRooms(parsedChats.filter((doc) => doc.lastMessage));
        });

        return () => unsubscribe();
    }, []);

    const getUserB = (user, contacts) => {
        const userContact = contacts.find((c) => c.email === user.email);

        if (userContact && userContact.contactName) {
            return { ...user, contactName: userContact.contactName };
        }

        return user;
    };

    return (
        <View style={styles.container}>
            <FlatList
                style={{ width: '100%' }}
                data={rooms}
                renderItem={({ item }) => (
                    <ListItem
                        type="chats"
                        key={item.id}
                        user={getUserB(item.userB, contacts)}
                        room={item}
                        lastMessage={item.lastMessage.text}
                        time={item.lastMessage.createdAt}
                    />
                )}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={() => (
                    <View>
                        <SearchBox onPress={() => navigation.navigate('Search')} />
                        <FlatList
                            data={Users}
                            horizontal
                            showsHorizontalScrollIndicator={false}
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
