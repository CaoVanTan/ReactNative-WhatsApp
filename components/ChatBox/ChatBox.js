import { TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { Entypo, FontAwesome5, Fontisto, Feather, Ionicons } from '@expo/vector-icons';

import styles from './style';
import Colors from '../../constants/Colors';

export default function ChatBox() {
    const [message, setMessage] = useState('');
    const [isFocusInput, setIsFocusInput] = useState(false);

    const handleChangeInput = (value) => {
        setMessage(value);
        setIsFocusInput(true);
    };

    const onMicrophonePress = () => {
        console.warn('Microphone');
    };

    const onSendPress = () => {
        console.warn('Sending: ', message.trim());
        setMessage('');
    };

    const onPress = () => {
        if (!message) {
            onMicrophonePress();
        } else {
            onSendPress();
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                {!isFocusInput ? (
                    <View style={{ flexDirection: 'row' }}>
                        <Entypo style={styles.attachment} name="attachment" size={18} color={Colors.light.tint} />
                        <Fontisto style={styles.camera} name="camera" size={18} color={Colors.light.tint} />
                    </View>
                ) : (
                    <TouchableOpacity activeOpacity={0.5} onPress={() => setIsFocusInput(false)}>
                        <Feather style={{ marginLeft: 8 }} name="chevron-right" size={24} color={Colors.light.tint} />
                    </TouchableOpacity>
                )}
                <FontAwesome5 style={styles.emoticon} name="smile" size={22} color={Colors.light.tint} />
                <TextInput
                    style={styles.input}
                    value={message}
                    placeholder="Aa"
                    autoComplete="off"
                    multiline
                    selectionColor={Colors.light.tint}
                    onPressIn={() => setIsFocusInput(true)}
                    onBlur={() => setIsFocusInput(false)}
                    onChangeText={handleChangeInput}
                />
            </View>
            <TouchableOpacity style={styles.buttonContainer} onPress={onPress} activeOpacity={0.8}>
                {message.trim().length > 0 ? (
                    <Ionicons name="send" size={22} color={Colors.light.tint} />
                ) : (
                    <FontAwesome5 name="microphone" size={22} color={Colors.light.tint} />
                )}
            </TouchableOpacity>
        </View>
    );
}
