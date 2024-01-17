import {Text, View, StyleSheet, ScrollView} from "react-native";
import {StatusBar} from "expo-status-bar";
import {Input, InputGroup, InputLeftAddon, InputRightAddon, SearchIcon, Button, HamburgerIcon} from "native-base";
import SearchEmptyState from "../components/SearchEmptyState";
import ProductItem from "../components/ProductItem";

const SearchScreen = ({navigation}) => {
  const product = {
    title: 'Kimono #MOCCA',
    price: '50.00',
    like: false
  }

  return (
    <View style={styles.search}>
      <ScrollView>
        <View style={styles.container}>
          <SearchIcon size="7" mt="0.5" mr="2" color="#000" />
          <Input w={{
            base: "70%",
            md: "100%"
          }} placeholder="nativebase" />
          <Button variant="ghost" onPress={() => console.log("hello world")} colorScheme="dark">Done</Button>
        </View>
        <View style={{ paddingHorizontal: 16 }}>
          <SearchEmptyState/>
        </View>
        <View style={{ paddingHorizontal: 16, marginBottom: 16, flexDirection: 'row', justifyContent: 'flex-end' }}>
          <Button variant="outline" leftIcon={<HamburgerIcon size="sm" />} onPress={() => navigation.push('SearchFilterScreen')}>
            Filters
          </Button>
        </View>
        <View style={{ paddingBottom: 100 }}>
          <ProductItem product={product} displayAction={false}/>
          <ProductItem product={product} displayAction={false}/>
          <ProductItem product={product} displayAction={false}/>
          <ProductItem product={product} displayAction={false}/>
          <ProductItem product={product} displayAction={false}/>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  search: {
    flex: 1,
    paddingTop: 70,
    backgroundColor: '#fff',
  },
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
});

export default SearchScreen
