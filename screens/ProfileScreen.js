import {Text, View, StyleSheet, ScrollView} from "react-native";
import {StatusBar} from "expo-status-bar";
import {Input, SearchIcon, Button, HamburgerIcon} from "native-base";
import OrderItem from "../components/OrderItem";
import OrderEmptyState from "../components/OrderEmptyState";

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
        <View style={{ paddingHorizontal: 16, marginBottom: 16 }}>
          <OrderEmptyState/>
        </View>
        <View style={{ paddingHorizontal: 16, marginBottom: 16, flexDirection: 'row', justifyContent: 'flex-end' }}>
          <Button variant="outline" leftIcon={<HamburgerIcon size="sm" />} onPress={() => navigation.push('ProfileDetailsFilterScreen')}>
            Filters
          </Button>
        </View>
        <View>
          <OrderItem product={product}/>
          <OrderItem product={product}/>
          <OrderItem product={product}/>
          <OrderItem product={product}/>
          <OrderItem product={product}/>
          <OrderItem product={product}/>
          <OrderItem product={product}/>
          <OrderItem product={product}/>
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
    justifyContent: 'center',
    paddingTop: 70
  },
});

export default Wishlist
