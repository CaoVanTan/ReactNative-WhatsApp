import { Text, View } from 'react-native';
import { useEffect, useState } from 'react';
import { useAssets } from 'expo-asset';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { onAuthStateChanged } from 'firebase/auth';

import RootNavigator from './navigation/RootNavigator';
import SignIn from './screens/SignIn';
import { auth } from './firebase';
import ContextWrapper from './context/ContextWrapper';

const Stack = createNativeStackNavigator();

function App() {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setLoading(false);
            if (user) {
                setCurrentUser(user);
            }
        });

        return () => unsubscribe();
    }, []);

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Loading...</Text>
            </View>
        );
    }

    return (
        <NavigationContainer>
            {!currentUser ? (
                <Stack.Navigator
                    screenOptions={{
                        headerShown: false,
                    }}
                >
                    <Stack.Screen name="signIn" component={SignIn} />
                </Stack.Navigator>
            ) : (
                <RootNavigator currentUser={currentUser} />
            )}
        </NavigationContainer>
    );
}

export default function Main() {
    const [assets] = useAssets(
        require('./assets/icon-square.png'),
        require('./assets/chatbg.png'),
        require('./assets/user-icon.png'),
        require('./assets/welcome-img.png'),
    );

    if (!assets) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Loading...</Text>
            </View>
        );
    }
    return (
        <ContextWrapper>
            <App />
        </ContextWrapper>
    );
}
