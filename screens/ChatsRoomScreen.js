// @refresh reset
import { StyleSheet, View, FlatList } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import 'react-native-get-random-values';
import { GiftedChat } from 'react-native-gifted-chat';

import Chats from '../data/Chats';
import ChatMessage from '../components/ChatMessage/ChatMessage';
import ChatBox from '../components/ChatBox/ChatBox';
import { auth, db } from '../firebase';
import { useRoute } from '@react-navigation/native';
import { addDoc, collection, doc, onSnapshot, setDoc, updateDoc } from 'firebase/firestore';

const randomId = nanoid();

const ChatsRoomScreen = () => {
    const [roomHash, setRoomHash] = useState('');
    const [messages, setMessages] = useState([]);

    const { currentUser } = auth;
    const route = useRoute();
    const room = route.params.room;
    const selectedImage = route.params.image;
    const userB = route.params.user;

    const senderUser = currentUser.photoURL
        ? { name: currentUser.displayName, _id: currentUser.uid, avatar: currentUser.photoURL }
        : { name: currentUser.displayName, _id: currentUser.uid };

    const roomId = room ? room.id : randomId;
    const roomRef = doc(db, 'rooms', roomId);
    const roomMessageRef = collection(db, 'rooms', roomId, 'messages');

    useEffect(() => {
        (async () => {
            if (!room) {
                const currentUserData = {
                    displayName: currentUser.displayName,
                    email: currentUser.email,
                };
                if (currentUser.photoURL) {
                    currentUserData.photoURL = currentUser.photoURL;
                }

                const userBData = {
                    displayName: userB.contactName || userB.displayName || '',
                    email: userB.email,
                };
                if (userB.photoURL) {
                    userBData.photoURL = userB.photoURL;
                }

                const roomData = {
                    participants: [currentUserData, userBData],
                    participantsArray: [currentUser.email, userB.email],
                };

                try {
                    setDoc(roomRef, roomData);
                } catch (error) {
                    console.log(error);
                }
            }

            const emailHash = `${currentUser.email}:${userB.email}`;
            setRoomHash(emailHash);
        })();
    }, []);

    useEffect(() => {
        const unsubscribe = onSnapshot(roomMessageRef, (querySnapshot) => {
            const messageFirestore = querySnapshot
                .docChanges()
                .filter(({ type }) => type === 'added')
                .map(({ doc }) => {
                    const message = doc.data();
                    return { ...message, createdAt: message.createdAt.toDate() };
                });
            appendMessages(messageFirestore);
        });

        return () => unsubscribe();
    }, []);

    const appendMessages = useCallback(
        (messages) => {
            setMessages((previousMessages) => GiftedChat.append(previousMessages, messages));
        },
        [messages],
    );

    const onSend = async (messages = []) => {
        const writes = messages.map((m) => addDoc(roomMessageRef, m));
        const lastMessage = messages[messages.length - 1];
        writes.push(updateDoc(roomRef, { lastMessage }));
        await Promise.all(writes);
    };

    console.log(messages);

    return (
        <View style={styles.container}>
            <GiftedChat onSend={onSend} messages={messages} user={senderUser} renderAvatar={null} />
        </View>

        // <View style={styles.container}>
        //     <FlatList data={Chats.messages} inverted renderItem={({ item }) => <ChatMessage message={item} />} />
        //     <ChatBox />
        // </View>
    );
};

const styles = StyleSheet.create({
    container: { backgroundColor: '#fff', justifyContent: 'flex-end', height: '100%' },
});

export default ChatsRoomScreen;
