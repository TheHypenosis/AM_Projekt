import {Text, View, StyleSheet, ScrollView} from "react-native";
import {StatusBar} from "expo-status-bar";
import { Button, Input,  Checkbox} from "native-base";
import OrderItem from "../components/OrderItem";


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
          <Checkbox.Group onChange={(value) => console.log(value)} accessibilityLabel="choose numbers">
            <Checkbox value="one" my={2}>
              All
            </Checkbox>
            <Checkbox value="two">1</Checkbox>
            <Checkbox value="two">2</Checkbox>
            <Checkbox value="two">3</Checkbox>
          </Checkbox.Group>
        </View>
        <View style={{ padding: 16 }}>
          <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 8 }}>Price</Text>
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
