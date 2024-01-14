import {Image, StyleSheet, Text, TouchableHighlight, View} from "react-native";

const Header = ({ title, source, actionFunc }) => {
  return (
    <View style={styles.section}>
      <Text style={styles.title}>{ title }</Text>
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
  action: {
  }
})

export default Header
