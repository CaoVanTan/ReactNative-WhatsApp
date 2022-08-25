import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Constants from 'expo-constants';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import Colors from '../constants/Colors';
import Button from '../components/Button/Button';
import { askForPermission, pickImage, uploadImage } from '../utils';
import { auth, db } from '../firebase';
import { updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

const ProfileScreen = ({ navigation }) => {
    const [displayName, setDisplayName] = useState('');
    const [selectedAvatar, setSelectedAvatar] = useState(null);
    const [permissionStatus, setPermissionStatus] = useState(null);

    useEffect(() => {
        (async () => {
            const status = await askForPermission();
            setPermissionStatus(status);
        })();
    }, []);

    const handleSelectAvatar = async () => {
        const result = await pickImage();

        if (!result.cancelled) {
            setSelectedAvatar(result.uri);
        }
    };

    const handlePress = async () => {
        const user = auth.currentUser;
        let pictureURL;
        if (selectedAvatar) {
            const { url } = await uploadImage(selectedAvatar, `images/${user.uid}`, 'profilePicture');
            pictureURL = url;
        }

        const userData = {
            displayName,
            email: user.email,
        };

        if (pictureURL) {
            userData.pictureURL = pictureURL;
        }

        await Promise.all([
            updateProfile(user, userData),
            setDoc(doc(db, 'users', user.uid), { ...userData, uid: user.uid }),
        ]);

        navigation.navigate('Root');
    };

    if (!permissionStatus) {
        return <Text>Loading...</Text>;
    }

    if (permissionStatus !== 'granted') {
        return <Text>Bạn cần cấp quyền cho camera.</Text>;
    }

    return (
        <React.Fragment>
            <StatusBar style="auto" />
            <View style={styles.container}>
                <Text style={styles.title}>Thông tin cá nhân</Text>
                {/* <Text style={styles.paraph}>Chọn ảnh đại diện và</Text> */}
                <TouchableOpacity style={styles.avatarContainer} activeOpacity={0.6} onPress={handleSelectAvatar}>
                    {!selectedAvatar ? (
                        <MaterialCommunityIcons name="camera-plus" size={48} color="gray" />
                    ) : (
                        <Image style={styles.avatar} source={{ uri: selectedAvatar }} resizeMode="center" />
                    )}
                </TouchableOpacity>
                <TextInput
                    style={styles.userName}
                    selectionColor={Colors.light.tint}
                    placeholder="Tên của bạn"
                    value={displayName}
                    onChangeText={(value) => setDisplayName(value)}
                />
                <Button title="Tiếp tục" onPress={handlePress} disabled={!displayName} />
            </View>
        </React.Fragment>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: Constants.statusBarHeight,
        backgroundColor: Colors.light.background,
        paddingHorizontal: 24,
    },
    title: {
        fontSize: 18,
        // color: Colors.light.tint,
    },
    paraph: {
        fontSize: 14,
    },
    avatarContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 24,
        width: 120,
        height: 120,
        borderRadius: 120,
        backgroundColor: Colors.light.backgroundIcon,
    },
    avatar: {
        width: '100%',
        height: '100%',
        borderRadius: 120,
    },
    userName: {
        width: '100%',
        marginVertical: 24,
        paddingVertical: 12,
        paddingHorizontal: 4,
        borderBottomColor: 'a8a8a8',
        borderBottomWidth: 0.5,
        fontSize: 16,
    },
});

export default ProfileScreen;
