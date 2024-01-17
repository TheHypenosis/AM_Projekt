import { StyleSheet, Text, TouchableHighlight, View } from "react-native";


const Section = ({ title, action, actionFunc }) => {
  return (
    <View style={styles.section}>
      <Text style={styles.title}>{ title }</Text>
      <TouchableHighlight onPress={actionFunc}>
        <Text style={styles.action}>{ action }</Text>
      </TouchableHighlight>
    </View>
  );
}


const styles = StyleSheet.create({
  section: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#363939'
  },
  action: {
    fontSize: 14,
    color: '#797A7B'
  }
});

export default Section;
