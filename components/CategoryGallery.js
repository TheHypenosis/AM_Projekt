import {Image, StyleSheet, Text, TouchableHighlight, View} from "react-native";
import ProductItem from "./ProductItem";
import {useMemo, useState} from "react";
import {useSelector} from "react-redux";


const CategoryGallery = () => {

  const products = useSelector((state) => state.wishlist.products);


  const [showMore, setShowMore] = useState(false);


  const displayProduct = useMemo(() => {
    return showMore ? products : products.slice(0, 2);
  }, [products, showMore]);

  const countMoreProducts = useMemo(() => {
    return showMore ? 0 : products.length - displayProduct.length;
  }, [products, showMore]);


  const moreProductsPress = () => {
    setShowMore(!showMore);
  };

  return (
    <View style={styles.gallery}>
      <View style={styles.header}>
        <Text style={styles.headerText}>ALL</Text>
        <Image source={require('../assets/more-horizontal.png')} />
      </View>
      <View style={styles.content}>
        {displayProduct.map((p, index) => (
          <ProductItem key={index} product={p} />
        ))}
      </View>
      <View style={styles.footer}>
        <TouchableHighlight onPress={moreProductsPress}>
          <Text>
            {showMore && products.length > 2
              ? `Show less`
              : `Show ${countMoreProducts} more items`}
          </Text>
        </TouchableHighlight>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  gallery: {
    width: '100%',
    borderColor: '#cacaca',
    borderStyle: 'solid',
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRadius: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: '3%',
    borderBottomWidth: 1,
    borderColor: '#cacaca',
  },
  headerText: {
    fontSize: 18,
    fontWeight: '600',
  },
  content: {
    borderBottomWidth: 1,
    borderColor: '#cacaca',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    textAlign: 'center',
    padding: '3%',
  },
});

export default CategoryGallery;
