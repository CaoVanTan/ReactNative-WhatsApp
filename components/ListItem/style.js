import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        marginHorizontal: 16,
        marginVertical: 8,
    },
    rightContainer: {
        justifyContent: 'center',
        marginLeft: 16,
    },
    userName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    timeContainer: {
        alignItems: 'flex-end',
    },
    time: {
        fontSize: 11,
    },
    description: {
        fontSize: 14,
    },
});

export default styles;
