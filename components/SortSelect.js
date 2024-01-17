import { Button } from "native-base";
import { View } from "react-native";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";


const SortSelect = ({ selected }) => {

  const [status, setStatus] = useState(0);


  const filters = useSelector((state) => state.orders.filters);

  const selectHandle = (value) => {
    console.log('select', value);
    setStatus(value);
    selected(value);
  }


  useEffect(() => {
    setStatus(filters.category);
  }, []);

  return (
    <View style={{ flexDirection: 'mid' }}>
      <Button variant={status === 0 ? 'solid' : 'outline'} colorScheme="primary" onPress={() => selectHandle(0)}>Wszystko</Button>
      <Button variant={status === 1 ? 'solid' : 'outline'} colorScheme="primary" onPress={() => selectHandle(1)}>Płaszcz</Button>
      <Button variant={status === 2 ? 'solid' : 'outline'} colorScheme="primary" onPress={() => selectHandle(2)}>But</Button>
      <Button variant={status === 3 ? 'solid' : 'outline'} colorScheme="primary" onPress={() => selectHandle(3)}>Koszulka</Button>
    </View>
  );
}

export default SortSelect;
