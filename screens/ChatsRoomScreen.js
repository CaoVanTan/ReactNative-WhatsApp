// @refresh reset
import { StyleSheet, View, TouchableOpacity, Image, TextInput } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import 'react-native-get-random-values';
import { GiftedChat, Actions, InputToolbar, Bubble } from 'react-native-gifted-chat';
import { useRoute } from '@react-navigation/native';
import { addDoc, collection, doc, onSnapshot, setDoc, updateDoc } from 'firebase/firestore';
import {
    Entypo,
    FontAwesome5,
    MaterialCommunityIcons,
    Feather,
    Ionicons,
    AntDesign,
    Fontisto,
} from '@expo/vector-icons';
import ImageView from 'react-native-image-viewing';

import Colors from '../constants/Colors';
import { auth, db } from '../firebase';
import { pickImage, uploadImage } from '../utils';

const randomId = nanoid();

const ChatsRoomScreen = () => {
    const [roomHash, setRoomHash] = useState('');
    const [messages, setMessages] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedImageView, setSelectedImageView] = useState('');
    const [message, setMessage] = useState('');
    const [isFocusInput, setIsFocusInput] = useState(false);

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
        const lastMessage = { ...message, text: 'Hình ảnh' };
        await Promise.all([addDoc(roomMessageRef, message), updateDoc(roomRef, { lastMessage })]);
    };

    const handlePhotoPicker = async () => {
        const result = await pickImage();

        if (!result.cancelled) {
            await sendImage(result.uri);
        }
    };

    const onInputTextChanged = (value) => {
        setMessage(value);
        setIsFocusInput(true);
    };

    const renderSend = (props) => {
        const { text, messageIdGenerator, user, onSend } = props;
        return (
            <View style={{ height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                {message.trim().length > 0 ? (
                    <TouchableOpacity
                        onPress={() => {
                            if (text && onSend) {
                                onSend({
                                    text: text.trim(),
                                    user,
                                    _id: messageIdGenerator(),
                                });
                            }

                            setMessage('');
                        }}
                        activeOpacity={0.8}
                        style={{}}
                    >
                        <Ionicons name="send" size={22} color={Colors.light.tint} />
                    </TouchableOpacity>
                ) : (
                    <AntDesign name="like1" size={22} color={Colors.light.tint} />
                )}
            </View>
        );
    };

    const renderInputToolbar = (props) => (
        <InputToolbar
            {...props}
            containerStyle={{
                backgroundColor: Colors.light.background,
                borderTopWidth: 0,
                paddingHorizontal: 16,
                paddingVertical: 8,
            }}
            renderActions={() => (
                <View>
                    {!isFocusInput ? (
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <TouchableOpacity activeOpacity={0.6}>
                                <Entypo name="attachment" size={22} color={Colors.light.tint} />
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={0.6} onPress={handlePhotoPicker}>
                                <Fontisto
                                    style={{ marginLeft: 16 }}
                                    name="camera"
                                    size={22}
                                    color={Colors.light.tint}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={0.6}>
                                <FontAwesome5
                                    style={{ marginLeft: 16 }}
                                    name="microphone"
                                    size={22}
                                    color={Colors.light.tint}
                                />
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <TouchableOpacity
                            style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}
                            activeOpacity={0.6}
                            onPress={() => setIsFocusInput(false)}
                        >
                            <Feather name="chevron-right" size={24} color={Colors.light.tint} />
                        </TouchableOpacity>
                    )}

                    <Actions
                        {...props}
                        containerStyle={{ position: 'absolute', left: 250, bottom: -4, zIndex: 1 }}
                        icon={() => (
                            <FontAwesome5 style={styles.emoticon} name="smile" size={22} color={Colors.light.tint} />
                        )}
                    />
                </View>
            )}
        />
    );

    const renderComposer = (props) => (
        <TextInput
            style={{
                flex: 1,
                marginHorizontal: 16,
                marginBottom: 0,
                paddingLeft: 12,
                paddingRight: 38,
                paddingVertical: 6,
                backgroundColor: Colors.light.backgroundIcon,
                borderRadius: 24,
                fontSize: 16,
                position: 'relative',
            }}
            value={message}
            placeholder="Nhập tin nhắn..."
            multiline
            autoComplete="off"
            selectionColor={Colors.light.tint}
            onPressIn={() => setIsFocusInput(true)}
            onBlur={() => setIsFocusInput(false)}
            onChangeText={onInputTextChanged}
        />
    );

    const renderBubble = (props) => (
        <Bubble
            {...props}
            textStyle={{ right: { color: Colors.light.background } }}
            wrapperStyle={{
                right: { backgroundColor: Colors.light.tint },
                left: { backgroundColor: Colors.light.backgroundIcon },
            }}
        />
    );

    const renderMessageImage = (props) => (
        <View>
            <TouchableOpacity
                activeOpacity={1}
                onPress={() => {
                    setModalVisible(true);
                    setSelectedImageView(props.currentMessage.image);
                }}
            >
                <Image
                    resizeMode="cover"
                    style={{ width: 200, height: 200 }}
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
    );

    const scrollToBottomComponent = () => (
        <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
            <MaterialCommunityIcons name="arrow-down" size={24} color={Colors.light.tint} />
        </View>
    );

    /* Fixing
        - Height của composer khi nhập nhiều ký tự.
        - Chỉ cuộn được khi chạm vào tin nhắn. (Xung đột với TouchableWithoutFeedback) -> Không đóng keyboard khi chạm vào màn hình.
        - Icon smile bị lệch trên thiết bị khác.
        - Margin top của message container bị lệch trên thiết bị khác.
        - Border radius của ảnh.
        - 
    */

    return (
        <View style={styles.container}>
            <GiftedChat
                text={message}
                messages={messages}
                user={senderUser}
                timeTextStyle={{ right: { color: Colors.light.background } }}
                showUserAvatar
                renderAvatar={null}
                renderSend={renderSend}
                renderInputToolbar={renderInputToolbar}
                renderComposer={renderComposer}
                renderBubble={renderBubble}
                renderMessageImage={renderMessageImage}
                onSend={onSend}
                scrollToBottom
                scrollToBottomComponent={scrollToBottomComponent}
                scrollToBottomStyle={{ bottom: 24, left: '45%' }}
                renderChatFooter={(props) => <View {...props} style={{ marginBottom: 8 }}></View>}
            />
        </View>

        // <View style={styles.container}>
        //     <FlatList data={Chats.messages} inverted renderItem={({ item }) => <ChatMessage message={item} />} />
        //     <ChatBox />
        // </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1,
        marginTop: -32,
    },
});

export default ChatsRoomScreen;
