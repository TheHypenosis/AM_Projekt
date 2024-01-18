import { Text, View, StyleSheet, ScrollView } from "react-native";
import {  Button, Input } from "native-base";
import StatusSelect from "../components/StatusSelect";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ordersActions } from "../store/orders";

const Wishlist = ({ navigation }) => {
  // Redux - pobranie stanu i dyspozytora
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.orders.filters);

  // Lokalny stan przechowujący wartości filtrów
  const [min, setMin] = useState('');
  const [max, setMax] = useState('');
  const [category, setCategory] = useState(0);

  // Funkcja obsługująca wybór kategorii
  const statusSelectedHandle = (value) => {
    setCategory(value);
  }

  // Funkcja obsługująca pokazanie wybranych filtrów
  const showFilters = () => {
    // Ustawienie filtrów w Redux Store
    dispatch(ordersActions.setFilters({
      category,
      min,
      max
    }));
    // Powrót do poprzedniego ekranu
    navigation.pop();
  }

  // Efekt ustawiający początkowe wartości filtrów na podstawie Redux Store
  useEffect(() => {
    setMin(filters.min);
    setMax(filters.max);
    setCategory(filters.category);
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView style={{ width: '100%' }}>
        {/* Filtr kategorii */}
        <View style={{ padding: 16 }}>
          <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 8 }}>Category</Text>
          <StatusSelect selected={statusSelectedHandle} />
        </View>

        {/* Filtr sumy zamówienia */}
        <View style={{ padding: 16 }}>
          <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 8 }}>Order Total</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Input placeholder="Min" w="45%" onChangeText={value => setMin(value)} value={min} />
            <Input placeholder="Max" w="45%" onChangeText={value => setMax(value)} value={max} />
          </View>
        </View>

        {/* Przyciski do powrotu i pokazania filtrów */}
        <View style={{ padding: 16, flexDirection: 'row', justifyContent: 'flex-end' }}>
          <Button variant="ghost" colorScheme="primary" onPress={() => navigation.pop()}>Back</Button>
          <Button variant="solid" colorScheme="primary" onPress={showFilters}>Show</Button>
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

export default Wishlist;
