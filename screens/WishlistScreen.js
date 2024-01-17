import { View, StyleSheet, ScrollView } from "react-native";
import EmptyState from "../components/EmptyState";
import Header from "../components/Header";
import CategoryGallery from "../components/CategoryGallery";
import { useSelector } from "react-redux";

const Wishlist = ({ navigation }) => {
  const products = useSelector((state) => state.wishlist.products);

  const morePress = () => {
    console.log('morePress');
  };

  const headerActionPress = () => {
    console.log('headerActionPress');
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={{ width: '100%', padding: 16 }}>
          <Header title="Wishlist" />
        </View>
        {products.length > 0 ? (
          <>
            <View style={{ width: '100%', padding: 16 }}>
              <CategoryGallery />
            </View>
          </>
        ) : (
          <>
            <View style={{ width: '100%', padding: 16 }}>
              <EmptyState />
            </View>
          </>
        )}
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
    paddingTop: 50,
  },
});

export default Wishlist;
