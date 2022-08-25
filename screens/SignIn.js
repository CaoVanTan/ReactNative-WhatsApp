import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
import React, { useContext, useState } from 'react';

import Context from '../context/Context';
import Colors from '../constants/Colors';
import Button from '../components/Button/Button';
import { signIn, signUp } from '../firebase';

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [mode, setMode] = useState('signUp');

    const handlePress = async () => {
        if (mode === 'signUp') {
            await signUp(email, password);
        } else if (mode === 'signIn') {
            await signIn(email, password);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome to WhatsApp</Text>
            <Image style={styles.image} source={require('../assets/welcome-img.png')} resizeMode="cover" />
            <View style={styles.mainContainer}>
                <TextInput
                    style={styles.email}
                    selectionColor={Colors.light.tint}
                    placeholder="Email"
                    value={email}
                    onChangeText={(value) => setEmail(value)}
                />
                <TextInput
                    style={styles.password}
                    selectionColor={Colors.light.tint}
                    placeholder="Mật khẩu"
                    secureTextEntry
                    value={password}
                    onChangeText={(value) => setPassword(value)}
                />
                <Button
                    title={mode === 'signUp' ? 'Đăng ký' : 'Đăng nhập'}
                    onPress={handlePress}
                    disabled={!email || !password}
                />
                <TouchableOpacity
                    style={styles.bottomContainer}
                    activeOpacity={0.7}
                    onPress={() => (mode === 'signUp' ? setMode('signIn') : setMode('signUp'))}
                >
                    <Text style={styles.text}>
                        {mode === 'signUp' ? 'Đã có tài khoản? Đăng nhập!' : 'Chưa có tài khoản? Đăng ký!'}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default SignIn;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.light.background,
    },
    title: {
        fontSize: 24,
        marginBottom: 18,
    },
    image: {
        width: 150,
        height: 150,
    },
    mainContainer: {
        width: '100%',
        marginTop: 18,
        paddingHorizontal: 24,
    },
    email: {
        width: '100%',
        paddingVertical: 12,
        paddingHorizontal: 4,
        borderBottomColor: 'a8a8a8',
        borderBottomWidth: 0.5,
        fontSize: 16,
    },
    password: {
        width: '100%',
        paddingVertical: 12,
        paddingHorizontal: 4,
        fontSize: 16,
    },
    bottomContainer: {
        marginTop: 18,
        alignItems: 'center',
    },
    text: {
        fontSize: 15,
        // color: Colors.light.tint,
    },
});
