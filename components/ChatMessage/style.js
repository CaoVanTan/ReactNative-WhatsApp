import { StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';
import Layout from '../../constants/Layout';

const styles = StyleSheet.create({
    container: {
        marginVertical: 8,
        paddingHorizontal: 16,
    },
    rightContainer: {
        alignSelf: 'flex-end',
    },
    leftContainer: {
        alignSelf: 'flex-start',
    },
    avatar: {
        width: 20,
        height: 20,
    },
    messageBox: {
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 16,
        alignSelf: 'flex-start',
    },
    myMessageBox: {
        backgroundColor: '#dcf8c5',
        marginLeft: 50,
        alignItems: 'flex-end',
    },
    yourMessageBox: {
        backgroundColor: '#ccc',
        marginRight: 50,
    },
    name: {
        color: Colors.light.tint,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    message: {},
    time: {
        marginTop: 4,
        color: 'gray',
        alignSelf: 'flex-end',
    },
});

export default styles;
