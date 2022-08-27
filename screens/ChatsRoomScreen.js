// @refresh reset
import { StyleSheet, View, FlatList, TouchableOpacity, Image } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import 'react-native-get-random-values';
import { GiftedChat, Actions, InputToolbar, Bubble } from 'react-native-gifted-chat';
import { useRoute } from '@react-navigation/native';
import { addDoc, collection, doc, onSnapshot, setDoc, updateDoc } from 'firebase/firestore';
import { Entypo, FontAwesome5, Fontisto, Feather, Ionicons } from '@expo/vector-icons';
import ImageView from 'react-native-image-viewing';

import Chats from '../data/Chats';
import ChatMessage from '../components/ChatMessage/ChatMessage';
import ChatBox from '../components/ChatBox/ChatBox';
import Colors from '../constants/Colors';
import { auth, db } from '../firebase';
import { pickImage, uploadImage } from '../utils';

const randomId = nanoid();

const ChatsRoomScreen = () => {
    const [roomHash, setRoomHash] = useState('');
    const [messages, setMessages] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedImageView, setSelectedImageView] = useState('');

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
                })
                .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
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

    const sendImage = async (uri, roomPath) => {
        const { url, fileName } = await uploadImage(uri, `images/rooms/${roomPath || roomHash}`);

        const message = {
            _id: fileName,
            text: '',
            createdAt: new Date(),
            user: senderUser,
            image: url,
        };

        console.log(url);
        console.log(message);

        const lastMessage = { ...message, text: 'Hình ảnh' };

        await Promise.all([addDoc(roomMessageRef, message), updateDoc(roomRef, { lastMessage })]);
    };

    const handlePhotoPicker = async () => {
        const result = await pickImage();

        if (!result.cancelled) {
            await sendImage(result.uri);
        }
    };

    return (
        <View style={styles.container}>
            <GiftedChat
                onSend={onSend}
                messages={messages}
                user={senderUser}
                placeholder="Nhập tin nhắn..."
                renderAvatar={null}
                renderActions={(props) => (
                    <Actions
                        {...props}
                        containerStyle={{ position: 'absolute', right: 50, bottom: -5, zIndex: 1 }}
                        onPressActionButton={handlePhotoPicker}
                        icon={() => (
                            <Fontisto style={styles.camera} name="camera" size={18} color={Colors.light.tint} />
                        )}
                    />
                )}
                timeTextStyle={{ right: { color: Colors.light.background } }}
                renderSend={(props) => {
                    const { text, messageIdGenerator, user, onSend } = props;
                    return (
                        <TouchableOpacity
                            onPress={() => {
                                if (text && onSend) {
                                    onSend({
                                        text: text.trim(),
                                        user,
                                        _id: messageIdGenerator(),
                                    });
                                }
                            }}
                            activeOpacity={0.8}
                        >
                            <Ionicons name="send" size={22} color={Colors.light.tint} />
                        </TouchableOpacity>
                    );
                }}
                renderInputToolbar={(props) => (
                    <InputToolbar
                        {...props}
                        containerStyle={{
                            justifyContent: 'center',
                            marginHorizontal: 8,
                            // marginBottom: 8,
                            // marginTop: 8,
                            paddingLeft: 16,
                            // paddingRight: 42,
                            // paddingVertical: 6,
                            backgroundColor: Colors.light.backgroundIcon,
                            borderRadius: 24,
                            borderTopWidth: 0,
                            fontSize: 16,
                        }}
                    />
                )}
                renderBubble={(props) => (
                    <Bubble
                        {...props}
                        textStyle={{ right: { color: Colors.light.background } }}
                        wrapperStyle={{
                            right: { backgroundColor: Colors.light.tint },
                            left: { backgroundColor: Colors.light.backgroundIcon },
                        }}
                    />
                )}
                renderMessageImage={(props) => (
                    <View style={{ borderRadius: 15 }}>
                        <TouchableOpacity
                            activeOpacity={0.6}
                            onPress={() => {
                                setModalVisible(true);
                                setSelectedImageView(props.currentMessage.image);
                            }}
                        >
                            <Image
                                resizeMode="contain"
                                style={{ width: 200, height: 200, padding: 6, borderRadius: 15, resizeMode: 'cover' }}
                                source={{ uri: props.currentMessage.image }}
                            />
                        </TouchableOpacity>
                        {selectedImageView ? (
                            <ImageView
                                imageIndex={0}
                                visible={modalVisible}
                                onRequestClose={() => setModalVisible(false)}
                                images={[{ uri: selectedImageView }]}
                            />
                        ) : null}
                    </View>
                )}
            />
        </View>

        // <View style={styles.container}>
        //     <FlatList data={Chats.messages} inverted renderItem={({ item }) => <ChatMessage message={item} />} />
        //     <ChatBox />
        // </View>
    );
};

const styles = StyleSheet.create({
    container: { backgroundColor: '#fff', justifyContent: 'flex-end', flex: 1 },
});

export default ChatsRoomScreen;
