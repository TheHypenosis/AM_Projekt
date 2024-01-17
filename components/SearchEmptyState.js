import {Button, Image, StyleSheet, Text, View} from "react-native";

const EmptyState = () => {
  return (
    <View style={styles.emptyState}>
      <Image style={styles.image} width="145" height="145" source={require('../assets/emptyState.png')}/>
      <Text style={styles.title}> BRAK </Text>
      <Text> </Text>
      <Text style={styles.subtitle2}>.......</Text>
      <View style={styles.action}>
        <Button color="#000" title="KLIK"/>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  emptyState: {
    minHeight: '40%',
    width: '100%',
    padding: '10%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    width: 145,
    height: 145,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#363939',
    textAlign: 'center',
    marginTop: '3%'
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#797A7B',
    textAlign: 'center',
    marginBottom: '3%'
  },
  subtitle2: {
    fontSize: 16,
    fontWeight: '600',
    color: '#363931',
    marginBottom: 16
  },
  action: {
    width: '100%',
    height: 48,
    justifyContent: 'center',
    backgroundColor: '#CA9446',
    borderRadius: 6
  }
})

export default EmptyState
