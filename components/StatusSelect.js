import {Button} from "native-base";
import {View} from "react-native";
import {useState} from "react";


const StatusSelect = () => {
  const [status, setStatus] = useState(0)

  const selectHandle = (value) =>{
    console.log('select', value)
    setStatus(value)
  }

  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
      <Button variant={status === 0 ? 'solid' : 'outline'} colorScheme="primary" onPress={() => selectHandle(0)}>All orders</Button>
      <Button variant={status === 1 ? 'solid' : 'outline'} colorScheme="primary" onPress={() => selectHandle(1)}>In transit</Button>
      <Button variant={status === 2 ? 'solid' : 'outline'} colorScheme="primary" onPress={() => selectHandle(2)}>Delivered</Button>
      <Button variant={status === 3 ? 'solid' : 'outline'} colorScheme="primary" onPress={() => selectHandle(3)}>Cancelled</Button>
    </View>
  )
}

export default StatusSelect
