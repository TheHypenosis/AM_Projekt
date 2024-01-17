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

 
  const statusSelectedHandle = (value) => {
    setCategory(value)
  }


  const showFilters = () => {
    console.log('searchActions.setFilters', searchActions)
    dispatch(searchActions.setFilters({
      category,
      min,
      max
    }))
    navigation.pop()
  }


  useEffect(() => {
    setMin(filters.min)
    setMax(filters.max)
    setCategory(filters.category)
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView style={{ width: '100%' }}>
        <View style={{ padding: 16 }}>
          <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 8 }}>Sort by</Text>
          <SortSelect selected={statusSelectedHandle}/>
        </View>
        <View style={{ padding: 16 }}>
          <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 8 }}>Price</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Input placeholder="Min" w="45%" onChangeText={value => setMin(value)} value={min} />
            <Input placeholder="Max" w="45%" onChangeText={value => setMax(value)} value={max} />
          </View>
        </View>
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
