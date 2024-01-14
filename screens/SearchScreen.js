import {Text, View, Button, StyleSheet} from "react-native";
import {StatusBar} from "expo-status-bar";
import {Input, InputGroup, InputLeftAddon, InputRightAddon} from "native-base";

const Wishlist = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text>Search</Text>
      <StatusBar style="auto" />
      <Button
        title="Go to Home"
        onPress={() =>
          navigation.navigate('Home')
        }
      />
        <InputGroup w={{
          base: "100%"
        }}>
          <InputLeftAddon children={"https://"} />
          <Input w={{
            base: "70%",
            md: "100%"
          }} placeholder="nativebase" />
          <InputRightAddon children={".io"} />
        </InputGroup>
    </View>
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

export default Wishlist
