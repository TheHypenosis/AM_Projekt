import {Text, View, Button, StyleSheet, ScrollView} from "react-native";
import EmptyState from "../components/EmptyState";
import Header from "../components/Header";
import CategoryGallery from "../components/CategoryGallery";
import Section from "../components/Section";


const Wishlist = ({navigation}) => {
  const product = {
    title: 'Kimono #MOCCA',
    price: '50.00',
    like: true
  }

  const morePress = () => {
    console.log('morePress')
  }

  const headerActionPress = () => {
    console.log('headerActionPress')
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={{ width: '100%', padding: 16 }}>
          <Header title="Wishlist" source={require('../assets/shopping-cart.png')} actionFunc={headerActionPress}/>
        </View>
        <View style={{ width: '100%', padding: 16 }}>
          <EmptyState/>
        </View>
        <View style={{ width: '100%', padding: 16 }}>
          <CategoryGallery/>
        </View>
        <View style={{ width: '100%', padding: 16 }}>
          <Section title="You also may like" action="View all" actionFunc={morePress}/>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 140,
    paddingBottom: 250
  },
});

export default Wishlist
