import {Button, Image, StyleSheet, Text, TouchableHighlight, View} from "react-native";

export const ProductItem = ({ product, displayAction = true }) => {
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
        {
          product.status === 0 ? (
            <Text style={{...styles.productContentDelivered, color: '#52565e'}}>Ordered</Text>
          ) :
            product.status === 1 ? (
              <Text style={{...styles.productContentDelivered, color: '#D68F26'}}>Arriving today</Text>
            ) :
              product.status === 2 ? (
                <Text style={{...styles.productContentDelivered, color: '#1E9C40'}}>Delivered 28/07/23</Text>
              ) :
                product.status === 3 ? (
                  <Text style={{...styles.productContentDelivered, color: '#fd5c63'}}>Canceled</Text>
                ) : (
                  <Text style={{...styles.productContentDelivered, color: '#52565e'}}>Ordered</Text>
                )
        }
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
  productContentDelivered: {
    fontSize: 12,
    fontWeight: '700',
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
