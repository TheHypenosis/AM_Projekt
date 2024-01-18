import {Text, View, StyleSheet, ScrollView} from "react-native";
import { Button, Input} from "native-base";
import SortSelect from "../components/SortSelect";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {searchActions} from "../store/serach";

const Wishlist = ({navigation}) => {
  const dispatch = useDispatch()
  const filters = useSelector((state) => state.search.filters);

  const [min, setMin] = useState('')
  const [max, setMax] = useState('')
  const [category, setCategory] = useState(0)

  // Obsługa zmiany statusu
  const statusSelectedHandle = (value) => {
    setCategory(value)
  }

  // Funkcja do wyświetlania filtrów
  const showFilters = () => {
    console.log('searchActions.setFilters', searchActions)
    dispatch(searchActions.setFilters({
      category,
      min,
      max
    }))
    navigation.pop()
  }

  // Efekt useEffect do inicjalizacji stanu z filtrami
  useEffect(() => {
    setMin(filters.min)
    setMax(filters.max)
    setCategory(filters.category)
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView style={{ width: '100%' }}>
        <View style={{ padding: 16 }}>
          {/* Nagłówek "Sort by" */}
          <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 8 }}>Sort by</Text>
          {/* Komponent SortSelect dla wyboru sortowania */}
          <SortSelect selected={statusSelectedHandle}/>
        </View>
        <View style={{ padding: 16 }}>
          {/* Nagłówek "Price" */}
          <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 8 }}>Price</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            {/* Input dla minimalnej ceny */}
            <Input placeholder="Min" w="45%" onChangeText={value => setMin(value)} value={min} />
            {/* Input dla maksymalnej ceny */}
            <Input placeholder="Max" w="45%" onChangeText={value => setMax(value)} value={max} />
          </View>
        </View>
        <View style={{ padding: 16, flexDirection: 'row', justifyContent: 'flex-end' }}>
          {/* Przycisk do powrotu */}
          <Button variant="ghost" colorScheme="primary" onPress={() => navigation.pop()}>Back</Button>
          {/* Przycisk do pokazania wyników zastosowanych filtrów */}
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
