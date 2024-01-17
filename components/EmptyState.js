import {Button, Image, StyleSheet, Text, View} from "react-native";

const EmptyState = () => {
  return (
    <View style={styles.emptyState}>
      <Text style={styles.title}> Brak produktu</Text>
      
    </View>
  )
}


const styles = StyleSheet.create({
  emptyState: {
    minHeight: '40%',
    width: '100%',
    padding: '10%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92AF96',
    borderRadius: 10
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
  action: {
    width: '100%',
    height: 48,
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 6
  }
})

export default EmptyState