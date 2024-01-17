import {Text, View, Button, StyleSheet, ScrollView} from "react-native";
import {StatusBar} from "expo-status-bar";
import Section from "../components/Section";
import Header from "../components/Header";
import CategoryGallery from "../components/CategoryGallery";


const HomeScreen = ({navigation}) => {
  const morePress = () => {
    console.log('morePress')
  }

  const headerActionPress = () => {
    console.log('headerActionPress')
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text>Home</Text>
        <StatusBar style="auto" />
        <Button
          title="Go to Wishlist"
          onPress={() =>
            navigation.navigate('Wishlist')
          }
        />
        <Header title="Wishlist" source={require('../assets/shopping-cart.png')} actionFunc={headerActionPress}/>
        <CategoryGallery/>
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
  },
});

export default HomeScreen
