import {Text, View, Button, StyleSheet, ScrollView} from "react-native";
import {StatusBar} from "expo-status-bar";
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
    paddingTop: 50
  },
});

export default HomeScreen
