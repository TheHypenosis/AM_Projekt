import { View, StyleSheet, ScrollView} from "react-native";
import EmptyState from "../components/EmptyState";
import Header from "../components/Header";
import CategoryGallery from "../components/CategoryGallery";


const Wishlist = ({navigation}) => {
  const product = {
    title: 'Kimono #MOCCA',
    price: '50.00',
    like: true
  }


  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={{ width: '100%', padding: 16 }}>
          <Header title="Wishlist" />
        </View>
        <View style={{ width: '100%', padding: 16 }}>
          <EmptyState/>
        </View>
        <View style={{ width: '100%', padding: 16 }}>
          <CategoryGallery/>
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
    paddingTop: 190,
    paddingBottom: 250
  },
});

export default Wishlist
