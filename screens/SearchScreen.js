import { TouchableWithoutFeedback, Keyboard, Text, StyleSheet, View } from 'react-native';
import React from 'react';

const SearchScreen = () => {
    return (
        <TouchableWithoutFeedback style={styles.container} onPress={() => Keyboard.dismiss()}>
            <View>
                <Text>SearchScreen</Text>
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {},
});

export default SearchScreen;
