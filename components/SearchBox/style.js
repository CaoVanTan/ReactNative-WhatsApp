import { StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        marginHorizontal: 16,
        marginVertical: 8,
        paddingVertical: 8,
        paddingHorizontal: 16,
        backgroundColor: Colors.light.backgroundIcon,
        borderRadius: 24,
    },
    text: {
        fontSize: 16,
        color: '#7a7a7a',
        marginLeft: 8,
    },
});

export default styles;
