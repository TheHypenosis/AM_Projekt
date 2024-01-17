import {Text, View, StyleSheet, ScrollView} from "react-native";
import {Input} from "native-base";
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
        
        <View>
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
