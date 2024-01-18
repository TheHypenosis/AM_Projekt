import {Image, StyleSheet, Text, TouchableHighlight, View} from "react-native";

// Komponent reprezentujący nagłówek
const Header = ({ title, source, actionFunc }) => {
  return (
    <View style={styles.section}>
      {/* Tekstowy tytuł nagłówka */}
      <Text style={styles.title}>{ title }</Text>
      {/* Przycisk z obrazkiem do wykonywania akcji */}
      <TouchableHighlight onPress={actionFunc}>
        <Image style={styles.action} source={source}/>
      </TouchableHighlight>
    </View>
  )
}

const styles = StyleSheet.create({
  section: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#363939'
  },

})

export default Header;
