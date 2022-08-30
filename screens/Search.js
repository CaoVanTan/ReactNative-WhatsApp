import { TouchableWithoutFeedback, Keyboard, Text, StyleSheet, View } from 'react-native';
import React from 'react';

const Search = () => {
    return (
        <TouchableWithoutFeedback style={styles.container} onPress={() => Keyboard.dismiss()}>
            <View>
                <Text>Search</Text>
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {},
});

export default Search;
