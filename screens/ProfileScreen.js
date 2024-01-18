import { View, StyleSheet, ScrollView } from "react-native";
import {  Button, HamburgerIcon } from "native-base";
import OrderItem from "../components/OrderItem";
import OrderEmptyState from "../components/OrderEmptyState";
import { useSelector } from "react-redux";
import { useMemo } from "react";


const Wishlist = ({ navigation }) => {
  // Pobranie danych z Redux Store
  const products = useSelector((state) => state.orders.products);
  const filters = useSelector((state) => state.orders.filters);

  // Funkcja filtrująca produkty na podstawie ustawionych filtrów
  const filterMethod = (products, filters) => {
    let result = JSON.parse(JSON.stringify(products));

    // Filtracja po cenie minimalnej
    if (filters.min && filters.min > 0) {
      result = result.filter(p => {
        return Number(p.price) >= filters.min;
      });
    }

    // Filtracja po cenie maksymalnej
    if (filters.max && filters.max > 0) {
      result = result.filter(p => {
        return Number(p.price) <= filters.max;
      });
    }

    // Filtracja po kategorii
    if (filters.category && filters.category > 0) {
      result = result.filter(p => {
        return p.status === filters.category;
      });
    }

    return result;
  };

  // Przefiltrowane produkty
  const displayProducts = useMemo(() => {
    return filterMethod(products, filters);
  }, [filters]);

  return (
    <View style={styles.container}>
      <ScrollView style={{ width: '100%' }}>
        {
          // Warunek sprawdzający, czy są jakieś produkty
          products.length > 0 ? (
            <>
              {/* Przycisk otwierający filtry */}
              <View style={{ paddingHorizontal: 16, marginBottom: 16, flexDirection: 'row', justifyContent: 'flex-end' }}>
                <Button variant="outline" leftIcon={<HamburgerIcon size="sm" />} onPress={() => navigation.push('ProfileDetailsFilterScreen')}>
                  Filters
                </Button>
              </View>

              {/* Wyświetlenie produktów */}
              <View>
                {
                  displayProducts.map(p => ( <OrderItem product={p} key={p.id}/> ))
                }
              </View>
            </>
          ) : (
            // Wyświetlenie komunikatu o braku produktów
            <View style={{ paddingHorizontal: 16, marginBottom: 16 }}>
              <OrderEmptyState/>
            </View>
          )
        }
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

export default Wishlist;
