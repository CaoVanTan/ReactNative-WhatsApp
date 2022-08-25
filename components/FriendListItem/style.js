import { StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginHorizontal: 10,
        marginVertical: 8,
    },
    avatar: {
        width: 56,
        height: 56,
        borderRadius: 100,
        marginBottom: 4,
    },
    userName: {
        color: Colors.light.text,
    },
});

export default styles;
