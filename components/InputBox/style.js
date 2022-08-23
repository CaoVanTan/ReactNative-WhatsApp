import { StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        paddingVertical: 6,
        paddingHorizontal: 4,
        backgroundColor: Colors.light.background,
    },
    inputContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    input: {
        flex: 1,
        marginHorizontal: 8,
        paddingLeft: 16,
        paddingRight: 42,
        paddingVertical: 6,
        backgroundColor: Colors.light.bgMessage,
        borderRadius: 24,
        fontSize: 16,
        maxHeight: 21 * 6,
    },
    emoticon: {
        position: 'absolute',
        right: 18,
        zIndex: 1,
    },
    attachment: {
        marginHorizontal: 8,
    },
    camera: {
        marginLeft: 8,
        marginRight: 4,
    },
    buttonContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.light.tint,
        borderRadius: 50,
        height: 40,
        width: 40,
    },
});

export default styles;
