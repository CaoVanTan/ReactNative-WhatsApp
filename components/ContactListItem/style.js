import { StyleSheet } from 'react-native';
import Layout from '../../constants/Layout';

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        padding: 16,
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 100,
    },
    rightContainer: {
        justifyContent: 'center',
        marginLeft: 16,
    },
    userName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    status: {},
});

export default styles;
