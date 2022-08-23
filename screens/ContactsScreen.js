import { FlatList, StyleSheet, View, Text } from 'react-native';
import ContactListItem from '../components/ContactListItem/ContactListItem';
import Users from '../data/Users';

export default function Contacts() {
    return (
        <View style={styles.container}>
            <FlatList
                style={{ width: '100%' }}
                data={Users}
                renderItem={({ item }) => <ContactListItem user={item} />}
                keyExtractor={(item) => item.id}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
