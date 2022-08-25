import { View, StyleSheet, TextInput } from 'react-native';
import React from 'react';
import Colors from '../../constants/Colors';

const HeaderSearch = () => {
    return (
        <View style={styles.container}>
            <TextInput style={styles.input} placeholder="Tìm kiếm" autoFocus selectionColor={Colors.light.tint} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    input: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.light.text,
    },
});

export default HeaderSearch;
