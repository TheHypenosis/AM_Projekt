import { View, StyleSheet, ScrollView } from "react-native";
import Header from "../components/Header";
import { useSelector } from "react-redux";
import ProductItem from "../components/ProductItem";

const HomeScreen = ({ navigation }) => {

  const products = useSelector((state) => state.wishlist.allProducts);

 
  const morePress = () => {
    console.log('morePress');
  }



  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={{ flexDirection: 'row', paddingHorizontal: 16 }}>
          <Header title="Home" />
        </View>
        
        <View style={{ width: '100%', paddingHorizontal: 16 }}>
          {products.map(p => (
            <ProductItem product={p} key={p.id} />
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 70,
  },
});

export default HomeScreen;
