import { StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        marginTop: 12,
        paddingVertical: 12,
        borderRadius: 16,
        backgroundColor: Colors.light.tint,
    },
    text: {
        color: 'white',
        textTransform: 'uppercase',
        fontSize: 15,
        fontWeight: 'bold',
    },
});

export default styles;
