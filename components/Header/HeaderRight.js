import { View, StyleSheet } from 'react-native';
import React from 'react';

import Colors from '../../constants/Colors';

const DefaultHeaderRight = (props) => {
    return <View style={styles.container}>{props.children}</View>;
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 8,
        backgroundColor: Colors.light.background,
    },
});

export default DefaultHeaderRight;
