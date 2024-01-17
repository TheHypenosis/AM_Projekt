import {Text, View, StyleSheet, ScrollView} from "react-native";
import {CheckIcon, Button, Input, SearchIcon, Select} from "native-base";
import StatusSelect from "../components/StatusSelect";

const Wishlist = ({navigation}) => {
  const product = {
    title: 'Kimono #MOCCA',
    price: '50.00',
    like: false,
    status: 2
  }

  return (
    <View style={styles.container}>
      <ScrollView style={{ width: '100%' }}>
        <View style={{ padding: 16 }}>
          <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 8 }}>Category</Text>
          <StatusSelect/>
        </View>
        <View style={{ padding: 16 }}>
          <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 8 }}>Order Total</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Input placeholder="Min" w="45%" />
            <Input placeholder="Max" w="45%" />
          </View>
        </View>
        <View style={{ padding: 16, flexDirection: 'row', justifyContent: 'flex-end' }}>
          <Button variant="ghost" colorScheme="primary" onPress={() => navigation.pop()}>Back</Button>
          <Button variant="solid" colorScheme="primary" onPress={() => navigation.pop()}>Show</Button>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
});

export default Wishlist
