import { View, StyleSheet, ScrollView} from "react-native";

import {Input, SearchIcon, Button, HamburgerIcon} from "native-base";
import SearchEmptyState from "../components/SearchEmptyState";
import ProductItem from "../components/ProductItem";
import {useEffect, useMemo, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {searchActions} from "../store/serach";

const SearchScreen = ({navigation}) => {
  const products = useSelector((state) => state.search.allProducts);
  const filters = useSelector((state) => state.search.filters);

  const dispatch = useDispatch()

  const [search, setSearch] = useState('')

  const searchInputHandle = (search) => {
    setSearch(search)
    dispatch(searchActions.setFilters({
      ...filters,
      search
    }))
  }


  const filterMethod = (products, filters) => {
    let result = JSON.parse(JSON.stringify(products))
    if (filters.search && filters.search.length) {
      result = result.filter(p => {
        return p.title?.startsWith(filters.search)
      })
    }
    if (filters.min && filters.min > 0) {
      result = result.filter(p => {
        return Number(p.price) >= filters.min
      })
    }

    if (filters.max && filters.max > 0) {
      result = result.filter(p => {
        return Number(p.price) <= filters.max
      })
    }

    if (filters.min && filters.min > 0) {
      result = result.filter(p => {
        return Number(p.price) >= filters.min
      })
    }
    if (filters.category && filters.category > 0) {
      result = result.filter(p => {
        return p.status === filters.category
      })
    }

    return result
  }


  const displayProducts = useMemo(() => {
    return filterMethod(products, filters)
  }, [filters])

  useEffect(() => {

  }, []);

  return (
    <View style={styles.search}>
      <ScrollView>
        <View style={styles.container}>
          <SearchIcon size="7" mt="0.5" mr="2" color="#000" />
          <Input w={{
            base: "70%",
            md: "100%",
          }} placeholder="szukaj" value={search} onChangeText={(value) => searchInputHandle(value)} />
        </View>
        {
          search && search.length && (
            <>
              {
                displayProducts && displayProducts.length ? (
                  <><>
                    <View style={{ paddingHorizontal: 16, marginBottom: 16, flexDirection: 'row', justifyContent: 'flex-end' }}>
                      <Button variant="outline" leftIcon={<HamburgerIcon size="sm" />} onPress={() => navigation.push('SearchFilterScreen')}>
                        Filters
                      </Button>
                    </View>
                    <View>
                      {
                        displayProducts.map(p => ( <ProductItem product={p} key={p.id}/> ))
                      }
                    </View></>
                    <View>
                  
                    </View></>
                ) : (
                  <View style={{ paddingHorizontal: 16 }}>
                    <SearchEmptyState/>
                  </View>
                )
              }
            </>
          )
        }
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

export default SearchScreen;
