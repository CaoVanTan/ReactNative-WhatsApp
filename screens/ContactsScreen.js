import { useContext, useEffect, useState } from 'react';
import { FlatList, StyleSheet, View, Text } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { collection, onSnapshot, query, where } from 'firebase/firestore';

import ListItem from '../components/ListItem/ListItem';
import Colors from '../constants/Colors';
import Context from '../context/Context';
import useContacts from '../hook/useHook';
import { db } from '../firebase';

export default function Contacts() {
    const contacts = useContacts();
    const route = useRoute();
    const image = route.params && route.params.image;

    return (
        <View style={styles.container}>
            <FlatList
                style={{ width: '100%', paddingTop: 8 }}
                data={contacts}
                renderItem={({ item }) => <ContactPreview contact={item} image={image} />}
                keyExtractor={(item, index) => index}
            />
        </View>
    );
}

const ContactPreview = ({ contact, image }) => {
    const { unfilteredRooms } = useContext(Context);
    const [user, setUser] = useState(contact);

    useEffect(() => {
        const q = query(collection(db, 'users'), where('email', '==', contact.email));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            if (snapshot.docs.length) {
                const userDoc = snapshot.docs[0].data();
                setUser((prevUser) => ({ ...prevUser, userDoc }));
            }
        });

        return () => unsubscribe();
    }, []);

    return (
        <ListItem
            type="contacts"
            user={user}
            image={image}
            room={unfilteredRooms.find((room) => room.participantsArray.includes(contact.email))}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.light.background,
    },
});
