import { Button } from "native-base";
import { View } from "react-native";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

// Komponent StatusSelect - wybór statusu zamówienia
const StatusSelect = ({ selected }) => {
  // Lokalny stan przechowujący aktualny status wybranego filtru
  const [status, setStatus] = useState(0);

  // Pobranie danych o filtrach z Redux Store
  const filters = useSelector((state) => state.orders.filters);

  // Obsługa wyboru statusu
  const selectHandle = (value) => {
    setStatus(value);
    // Przekazanie wybranego statusu do rodzica (selected)
    selected(value);
  }

  // Efekt ustawiający początkową wartość statusu na podstawie filtrów
  useEffect(() => {
    setStatus(filters.status);
  }, []);

  return (
    <View style={{ flexDirection: 'mid', justifyContent: 'space-between' }}>
      {/* Przyciski reprezentujące różne statusy */}
      <Button variant={status === 0 ? 'solid' : 'outline'} colorScheme="primary" onPress={() => selectHandle(0)}>Wszystko</Button>
      <Button variant={status === 1 ? 'solid' : 'outline'} colorScheme="primary" onPress={() => selectHandle(1)}>W dostawie</Button>
      <Button variant={status === 2 ? 'solid' : 'outline'} colorScheme="primary" onPress={() => selectHandle(2)}>Dostarczone</Button>
      <Button variant={status === 3 ? 'solid' : 'outline'} colorScheme="primary" onPress={() => selectHandle(3)}>Anulowane</Button>
    </View>
  );
}

export default StatusSelect;
