import { StyleSheet } from 'react-native';
import Layout from '../../constants/Layout';

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 8,
        paddingHorizontal: 16,
    },
    leftContainer: {
        flexDirection: 'row',
    },
    midContainer: {
        justifyContent: 'space-between',
        marginLeft: 16,
        paddingVertical: 6,
    },
    userName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    lastMessage: {
        fontSize: 14,
        color: '#555',
        width: Layout.window.width / 2 - 20,
    },
    rightContainer: {
        paddingBottom: 6,
        justifyContent: 'flex-end',
    },
    time: {
        fontSize: 14,
        color: '#555',
    },
});

export default styles;
