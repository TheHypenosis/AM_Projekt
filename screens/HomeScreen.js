import { View, StyleSheet, ScrollView } from "react-native";
import Header from "../components/Header";
import { useSelector } from "react-redux";
import ProductItem from "../components/ProductItem";

const HomeScreen = ({ navigation }) => {
  // Pobranie produktów z listy życzeń z Redux Store
  const products = useSelector((state) => state.wishlist.allProducts);

  // Funkcja obsługująca naciśnięcie przycisku "More"
  const morePress = () => {
    console.log('morePress');
  }

  // Funkcja obsługująca naciśnięcie akcji w nagłówku
  const headerActionPress = () => {
    console.log('headerActionPress');
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        {/* Nagłówek ekranu */}
        <View style={{ flexDirection: 'row', paddingHorizontal: 16 }}>
          <Header title="Home" />
        </View>
        
        {/* Lista produktów */}
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
