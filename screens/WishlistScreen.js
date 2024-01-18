import { View, StyleSheet, ScrollView } from "react-native";
import EmptyState from "../components/EmptyState";
import Header from "../components/Header";
import CategoryGallery from "../components/CategoryGallery";
import { useSelector } from "react-redux";

const Wishlist = ({ navigation }) => {
  // Pobieranie produktów z magazynu stanu Redux
  const products = useSelector((state) => state.wishlist.products);

  // Funkcja obsługująca naciśnięcie przycisku "more"
  const morePress = () => {
    console.log('morePress');
  };

  // Funkcja obsługująca naciśnięcie przycisku akcji nagłówka
  const headerActionPress = () => {
    console.log('headerActionPress');
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        {/* Nagłówek strony z tytułem "Wishlist" */}
        <View style={{ width: '100%', padding: 16 }}>
          <Header title="Wishlist" />
        </View>

        {/* Warunek sprawdzający, czy istnieją produkty na liście życzeń */}
        {products.length > 0 ? (
          <>
            {/* Komponent wyświetlający galerię kategorii */}
            <View style={{ width: '100%', padding: 16 }}>
              <CategoryGallery />
            </View>
          </>
        ) : (
          <>
            {/* Komponent wyświetlający pusty stan, gdy nie ma produktów na liście życzeń */}
            <View style={{ width: '100%', padding: 16 }}>
              <EmptyState />
            </View>
          </>
        )}
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
    paddingTop: 50,
  },
});

export default Wishlist;
