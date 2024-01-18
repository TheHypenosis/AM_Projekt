import {Image, StyleSheet, Text, TouchableHighlight, View} from "react-native";
import ProductItem from "./ProductItem";
import {useMemo, useState} from "react";
import {useSelector} from "react-redux";

// Komponent CategoryGallery
const CategoryGallery = () => {
  // Pobierz produkty z listy życzeń za pomocą useSelector z biblioteki react-redux
  const products = useSelector((state) => state.wishlist.products);

  // Stan do kontrolowania widoczności dodatkowych produktów
  const [showMore, setShowMore] = useState(false);

  // Wyświetl produkty zależnie od wartości showMore
  const displayProduct = useMemo(() => {
    return showMore ? products : products.slice(0, 3);
  }, [products, showMore]);

  // Oblicz liczbę dodatkowych produktów do wyświetlenia
  const countMoreProducts = useMemo(() => {
    return showMore ? 0 : products.length - displayProduct.length;
  }, [products, showMore]);

  // Obsługa naciśnięcia przycisku "Show more/less"
  const moreProductsPress = () => {
    setShowMore(!showMore);
  };

  // Renderowanie komponentu
  return (
    <View style={styles.gallery}>
      <View style={styles.header}>
        {/* Nagłówek kategorii */}
        <Text style={styles.headerText}>ALL</Text>
        {/* Ikona do dodania funkcjonalności związanej z "more-horizontal.png" */}
        <Image source={require('../assets/more-horizontal.png')} />
      </View>
      <View style={styles.content}>
        {/* Wyświetlanie produktów za pomocą komponentu ProductItem */}
        {displayProduct.map((p, index) => (
          <ProductItem key={index} product={p} />
        ))}
      </View>
      <View style={styles.footer}>
        {/* Przycisk do pokazywania/ukrywania dodatkowych produktów na Wishlista */}
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

// Style dla komponentu CategoryGallery
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
