import { StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';
import Layout from '../../constants/Layout';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'flex-end',
        marginVertical: 6,
        paddingLeft: 8,
        paddingRight: 8,
    },
    rightContainer: {
        alignSelf: 'flex-end',
        paddingLeft: 50,
    },
    leftContainer: {
        flexDirection: 'row',
        alignSelf: 'flex-start',
        paddingRight: 80,
    },
    avatar: {
        width: 25,
        height: 25,
        borderRadius: 15,
        marginRight: 8,
    },
    messageBox: {
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 16,
        alignSelf: 'flex-start',
    },
    myMessageBox: {
        backgroundColor: '#dcf8c5',
        alignItems: 'flex-end',
    },
    yourMessageBox: {
        backgroundColor: Colors.light.bgMessage,
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
