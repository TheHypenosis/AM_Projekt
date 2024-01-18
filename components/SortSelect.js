import { Button } from "native-base";
import { View } from "react-native";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

// Komponent SortSelect - wybór kategorii sortowania
const SortSelect = ({ selected }) => {
  // Lokalny stan przechowujący aktualny status wybranej kategorii
  const [status, setStatus] = useState(0);

  // Pobranie danych o filtrach z Redux Store
  const filters = useSelector((state) => state.orders.filters);

  // Obsługa wyboru kategorii
  const selectHandle = (value) => {
    console.log('select', value);
    // Ustawienie nowego statusu i przekazanie go do rodzica (selected)
    setStatus(value);
    selected(value);
  }

  // Efekt ustawiający początkową wartość statusu na podstawie filtrów
  useEffect(() => {
    setStatus(filters.category);
  }, []);

  return (
    <View style={{ flexDirection: 'mid' }}>
      {/* Przyciski reprezentujące różne kategorie */}
      <Button variant={status === 0 ? 'solid' : 'outline'} colorScheme="primary" onPress={() => selectHandle(0)}>Wszytko</Button>
      <Button variant={status === 1 ? 'solid' : 'outline'} colorScheme="primary" onPress={() => selectHandle(1)}>Płaszcz</Button>
      <Button variant={status === 2 ? 'solid' : 'outline'} colorScheme="primary" onPress={() => selectHandle(2)}>But</Button>
      <Button variant={status === 3 ? 'solid' : 'outline'} colorScheme="primary" onPress={() => selectHandle(3)}>Koszulka</Button>
    </View>
  );
}

export default SortSelect;
