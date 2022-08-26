import { StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 18,
        right: 18,
        justifyContent: 'center',
        alignItems: 'center',
        width: 60,
        height: 60,
        backgroundColor: Colors.light.tint,
        borderRadius: 50,
    },
});

export default styles;
