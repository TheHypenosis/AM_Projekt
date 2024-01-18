import { Image, StyleSheet, Text, TouchableHighlight, View} from "react-native";
import { useDispatch } from "react-redux";
import { wishlistActions } from '../store/wl';
import { useEffect, useState } from "react";

// Komponent reprezentujący element produktu
export const ProductItem = ({ product, displayAction = true, removeToWishlist, addToWishlist }) => {
  const dispatch = useDispatch();
  
  // Stan reprezentujący stan polubienia produktu
  const [like, setLike] = useState(product.like);

  // Obsługa dodawania produktu do listy życzeń
  const addWishlistHandle = () => {
    setLike(!like);
    dispatch(wishlistActions.addToWishlist({
      ...product,
      like: true
    }));
  };

  // Obsługa usuwania produktu z listy życzeń
  const removeWishlistHandle = () => {
    setLike(!like);
    dispatch(wishlistActions.removeToWishlist({
      ...product,
      like: false
    }));
  };

  // Efekt ustawiający początkową wartość stanu 'like' na podstawie produktu
  useEffect(() => {
    setLike(product.like);
  }, [product.like]);

  // Obsługa naciśnięcia przycisku "Like"
  const likePress = () => {
    console.log('likePress');
  };

  return (
    <View style={styles.productContainer}>
      {/* Obrazek produktu */}
      <Image style={styles.productImage} source={{ uri: 'https://picsum.photos/300/300' }} />
      
      {/* Zawartość produktu */}
      <View style={styles.productContent}>
        {/* Nagłówek z tytułem i przyciskiem "Like" */}
        <View style={styles.productContentHeader}>
          <Text style={styles.productContentTitle}>{product.title}</Text>
          
          {/* Przycisk "Like" w zależności od stanu 'like' */}
          {like ? (
            <TouchableHighlight onPress={removeWishlistHandle}>
              <Image source={require('../assets/favorite.png')} />
            </TouchableHighlight>
          ) : (
            <TouchableHighlight onPress={addWishlistHandle}>
              <Image source={require('../assets/unfavorite.png')} />
            </TouchableHighlight>
          )}
        </View>
        
        {/* Cena produktu */}
        <Text style={styles.productContentPrice}>${product.price}</Text>
        
        {/* Status zamówienia */}
        {product.status === 0 ? (
          <Text style={{ ...styles.productContentDelivered, color: '#52565e' }}></Text>
        ) : product.status === 1 ? (
          <Text style={{ ...styles.productContentDelivered, color: '#D68F26' }}>Płaszcz</Text>
        ) : product.status === 2 ? (
          <Text style={{ ...styles.productContentDelivered, color: '#1E9C40' }}>But</Text>
        ) : product.status === 3 ? (
          <Text style={{ ...styles.productContentDelivered, color: '#52565e' }}>Koszula</Text>
        ) : (
          <Text style={{ ...styles.productContentDelivered, color: '#52565e' }}>Inny Produkt</Text>
        )}
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  productContainer: {
    flexDirection: 'row',
    minHeight: '10%',
    padding: '4%',
    borderStyle: 'solid',
    borderTopWidth: 1,
    borderTopColor: '#cacaca',
    borderBottomWidth: 1,
    borderBottomColor: '#cacaca'
  },
  productImage: {
    flex: 1,
    borderRadius: 10
  },
  productContent: {
    flex: 3,
    flexDirection: 'column',
    paddingLeft: '5%',
    paddingVertical: '2%'
  },
  productContentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center'
  },
  productContentTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: '2%'
  },
  productContentPrice: {
    fontSize: 14,
    fontWeight: 'normal',
    marginBottom: '2%'
  },
  productAction: {
    backgroundColor: '#ECD7BA',
    borderRadius: 4
  }
});

export default ProductItem;
