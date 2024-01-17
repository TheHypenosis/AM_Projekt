import {Image, StyleSheet, Text, View} from "react-native";
import ProductItem from "./ProductItem";

const CategoryGallery = () => {
  const product = {
    title: 'Kimono #MOCCA',
    price: '50.00',
    like: true
  }

  return (
    <View style={styles.gallery}>
      <View style={styles.header}>
        <Text style={styles.headerText}>CG</Text>
        <Image source={require('../assets/more-horizontal.png')}/>
      </View>
      <View style={styles.content}>
        <ProductItem product={product}/>
        <ProductItem product={product}/>
        <ProductItem product={product}/>
        <ProductItem product={product}/>
        <ProductItem product={product}/>
      </View>
      <View style={styles.footer}>
      <Text>Więcej</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  gallery: {
    width: '100%',
    borderColor: '#cacaca',
    borderStyle: 'solid',
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRadius: 10
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
    fontWeight: '600'
  },
  content: {
    borderBottomWidth: 1,
    borderColor: '#cacaca',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    textAlign: 'center',
    padding: '3%'
  }
})

export default CategoryGallery
