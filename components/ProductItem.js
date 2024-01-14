import {Button, Image, StyleSheet, Text, View} from "react-native";

export const ProductItem = ({ product }) => {

 

  return (
    <View style={styles.productContainer}>
      <Image style={styles.productImage} source={{
        uri: 'https://picsum.photos/300/300',
      }}/>
      <View style={styles.productContent}>
        <View style={styles.productContentHeader}>
          <Text style={styles.productContentTitle}>{ product.title }</Text>

        </View>
        <Text style={styles.productContentPrice}>${ product.price }</Text>
        <View style={styles.productAction}>
          <Button color="#000" title="Add to card"/>
        </View>
      </View>
    </View>
  )
}

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
})

export default ProductItem
