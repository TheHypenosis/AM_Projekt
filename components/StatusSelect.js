import { Button } from "native-base";
import { View } from "react-native";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";


const StatusSelect = ({ selected }) => {

  const [status, setStatus] = useState(0);

  const filters = useSelector((state) => state.orders.filters);


  const selectHandle = (value) => {
    setStatus(value);
    selected(value);
  }


  useEffect(() => {
    setStatus(filters.status);
  }, []);

  return (
    <View style={{ flexDirection: 'mid', justifyContent: 'space-between' }}>
      <Button variant={status === 0 ? 'solid' : 'outline'} colorScheme="primary" onPress={() => selectHandle(0)}>Wszystko</Button>
      <Button variant={status === 1 ? 'solid' : 'outline'} colorScheme="primary" onPress={() => selectHandle(1)}>W dostawie</Button>
      <Button variant={status === 2 ? 'solid' : 'outline'} colorScheme="primary" onPress={() => selectHandle(2)}>Dostarczone</Button>
      <Button variant={status === 3 ? 'solid' : 'outline'} colorScheme="primary" onPress={() => selectHandle(3)}>Anulowane</Button>
    </View>
  );
}

export default StatusSelect;
